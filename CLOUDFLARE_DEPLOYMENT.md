# Deploy this website on Cloudflare Pages

This repository is a static Astro website. No runtime adapter or new hosting-specific dependencies are needed.

## Connect GitHub

1. Sign in at https://dash.cloudflare.com and open **Workers & Pages**.
2. Select **Create application > Pages > Connect to Git**, then authorize GitHub.
3. Select **0Raul0/personal-website**.
4. Set:
   - Production branch: `main`
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: repository root (`/`)
   - Node.js: pinned to `22.23.4` in `.node-version`
5. Deploy, then test the provided `*.pages.dev` address before changing DNS. In particular test `/blog`, all four blog posts, `/literature-review`, and `/opportunities`.

## Keep raulsheth.com (registered at Spaceship)

An apex domain such as `raulsheth.com` requires Cloudflare DNS (Cloudflare nameservers) for use as a Cloudflare Pages custom domain.

1. In Cloudflare, add the existing domain `raulsheth.com` to the **Free** plan. This does **not** mean transferring the domain registration away from Spaceship.
2. Carefully check the imported DNS records before changing nameservers. Preserve any MX, SPF, DKIM, DMARC, verification, or other non-website records; DNS import is not guaranteed to discover everything. Do not copy obsolete Netlify website records as the final Pages destination.
3. Under your Pages project's **Custom domains**, add `raulsheth.com` and (if wanted) `www.raulsheth.com`. Follow the DNS instructions Cloudflare gives for each hostname.
4. In Spaceship, open domain settings for `raulsheth.com`, locate **Nameservers**, and change them to the **two nameservers provided for your domain in your own Cloudflare account**. Do not guess these values or use somebody else's.
5. Wait for the Cloudflare zone to become active and the Pages custom-domain certificate to finish provisioning. Verify HTTPS and the main routes on the custom domain.
6. Only after the new site is working should you disable or remove the old Netlify site. Keep the Spaceship domain registration.

Cloudflare Pages will rebuild from future commits to `main` once the Git integration is active. The existing GitHub Actions workflow for updating the opportunities feed remains independent of the host.

Sources: https://developers.cloudflare.com/pages/get-started/git-integration/ and https://developers.cloudflare.com/pages/configuration/custom-domains/
