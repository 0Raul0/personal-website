// Fetches public AISafety.com listings into a static snapshot for the website.
// All sources are untrusted. We retain links to the original listings, not claims of verification.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const endpoints = ['jobs', 'training', 'events', 'courses', 'funding', 'projects'];
const source = 'https://aisafety.com/api/v1/';
const now = new Date();
const today = now.toISOString().slice(0, 10);
const previousPath = 'src/data/opportunities-live.json';
const previous = await readFile(previousPath, 'utf8')
  .then(JSON.parse)
  .catch(() => ({ listings: [], updatedAt: null }));
const categories = {
  jobs: 'Jobs',
  training: 'Fellowships & training',
  events: 'Events',
  courses: 'Courses',
  funding: 'Funding',
  projects: 'Research projects',
};
const words =
  /ai safety|alignment|governance|evaluat|interpret|policy|research|model|fellow|intern|security|oversight|control/i;
const normalizeDate = (v) =>
  typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : null;
const string = (v) =>
  typeof v === 'string'
    ? v.trim()
    : Array.isArray(v)
      ? v.filter((x) => typeof x === 'string').join(', ')
      : '';
const cleanUrl = (v) => {
  try {
    const u = new URL(v);
    return ['https:', 'http:'].includes(u.protocol) ? u.toString() : null;
  } catch {
    return null;
  }
};
const items = [];
const failures = [];
for (const endpoint of endpoints) {
  try {
    const response = await fetch(source + endpoint, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw Error('HTTP ' + response.status);
    const body = await response.json();
    if (!Array.isArray(body.data)) throw Error('Unexpected response');
    for (const record of body.data) {
      if (!record || typeof record !== 'object') continue;
      const title = string(record.name || record.title);
      const url = cleanUrl(record.url || record.website || record.link);
      if (!title || !url) continue;
      let deadline = normalizeDate(record.applicationsClose || record.deadline);
      const starts = normalizeDate(record.startDate);
      const ends = normalizeDate(record.endDate);
      if (deadline && deadline < today) continue;
      if (endpoint === 'events' && (ends || starts) && (ends || starts) < today) continue;
      if (record.applicationStatus === 'Closed' || (record.notYetOpen === true && !deadline))
        continue;
      const desc = string(record.description)
        .replace(/<[^>]*>/g, '')
        .slice(0, 430);
      const location = string(record.location || record.workLocation || record.mode);
      const organisation = string(record.organization || record.organizer || record.host);
      if (
        !words.test([title, desc, organisation].join(' ')) &&
        !['projects', 'training', 'events'].includes(endpoint)
      )
        continue;
      items.push({
        id: String(endpoint + '-' + (record.id || url)),
        title,
        organisation,
        category: categories[endpoint],
        location,
        deadline,
        startDate: starts,
        availableFrom: null,
        detail: desc,
        url,
        source: 'AISafety.com',
        experience: string(record.minimumExperience || record.entryBar),
        status: record.notYetOpen ? 'Upcoming' : 'Check source',
      });
    }
  } catch (error) {
    failures.push(endpoint + ': ' + error.message);
  }
}
const seen = new Set();
const unique = items.filter((item) => {
  const key = item.url.toLowerCase().replace(/\/$/, '');
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
if (!unique.length && failures.length) {
  console.error('No valid source data. Retaining previous snapshot:', failures.join('; '));
  if (process.env.CI) process.exitCode = 1;
} else {
  // Do not erase previously fetched categories if one endpoint temporarily fails.
  const failedCategories = new Set(failures.map((f) => categories[f.split(':')[0]]));
  for (const old of previous.listings || []) {
    if (
      failedCategories.has(old.category) &&
      (!old.deadline || old.deadline >= today) &&
      (old.category !== 'Events' || !(old.startDate && old.startDate < today))
    ) {
      const key = String(old.url || '')
        .toLowerCase()
        .replace(/\/$/, '');
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(old);
      }
    }
  }
  const snapshot = { updatedAt: now.toISOString(), source, failures, listings: unique };
  await mkdir('src/data', { recursive: true });
  await writeFile(previousPath, JSON.stringify(snapshot, null, 2) + '\n');
  console.log('Fetched ' + unique.length + ' listings. Failures: ' + failures.join('; '));
}
