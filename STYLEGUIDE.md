# Style Guide

Source of truth: [src/styles/global.scss](src/styles/global.scss).

The site preserves Self Esteem’s editorial language: warm paper (`#e9e6e4`), ink (`#121418`), thin rules (`#94918f`), clear headings, and simple typography. Avoid gradients, shadows, and accent colors.

## Typography

- Space Grotesk: the main text, with regular, medium, and bold weights.
- The homepage greeting uses Raul’s original handwriting as an image with accessible alternative text. All other text stays upright, including navigation hover states, emphasis, quotes, dates, captions, and empty states.
- Both fonts are self-hosted in `public/fonts/` with their SIL Open Font Licenses.

Page titles use `clamp(40px, 7vw, 88px)`. Prose uses 18px type with 1.65 line height and a maximum width of 65 characters. Keep heading letter spacing tight.

## Layout and components

All three sections share [PageLayout](src/layouts/PageLayout.astro), with a top navigation, a maximum 920px main column for writing, and a full-width footer. The About homepage fills the browser width with small responsive edge gutters. Its greeting, biography, sign-off, and writing links sit in the left column, with three grayscale photos in a straight-edged mosaic on the right: one larger portrait spanning both rows, and two smaller tiles stacked beside it. The unequal rows and columns provide the patchwork proportions; frames are never rotated. On wider screens, the text determines the row height and the photo grid fits that height with cropped images. The left column stays top-aligned. At 680px and below, the mosaic moves beneath the text and uses a square overall aspect ratio. The greeting uses a closely cropped image of Raul’s handwriting, capped at 380px wide and scaled down on narrow screens. Its white background blends into the page with multiply blending. The biography has three short paragraphs: an unindented introduction with the college and course in bold, followed by two indented notes with matching decorative arrow marks hidden from assistive technology. The regular-weight “Enjoy your stay :)” sign-off is unindented and uses the same 19px font as the biography. Numbered sections and fine rules retain the template’s editorial style. Navigation remains visible and wraps on mobile.

- [BaseLayout](src/layouts/BaseLayout.astro): document shell, canonical URL, metadata, and global styles.
- [Navigation](src/components/Navigation.astro): the three section links, reused in the header and footer.
- [Footer](src/components/Footer.astro): branding, navigation, and copyright.
- [ArticleList](src/components/ArticleList.astro): dated article links or an explicit empty state.

Wrap Markdown article bodies in `.prose` for headings, quotes, code blocks, and grayscale images. Preserve visible keyboard focus. Use semantic headings and links with descriptive text.

See [README.md](README.md) for adding Markdown to either collection.
