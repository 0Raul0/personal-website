# Style Guide

Source of truth: [src/styles/global.scss](src/styles/global.scss).

The site preserves Self Esteem’s editorial language: warm paper (`#e9e6e4`), ink (`#121418`), thin rules (`#94918f`), clear headings, and simple typography. Avoid gradients, shadows, and accent colors.

## Typography

- Space Grotesk: all text, with regular, medium, and bold weights. The variable font is self-hosted in `public/fonts/` with its SIL Open Font License.
- All text stays upright, including navigation hover states, emphasis, quotes, dates, captions, and empty states.

Page titles use `clamp(40px, 7vw, 88px)`. Prose uses 18px type with 1.65 line height and a maximum width of 65 characters. Keep heading letter spacing tight.

## Layout and components

All three sections share [PageLayout](src/layouts/PageLayout.astro), with a top navigation, a maximum 920px main column, and a footer. About uses a wider editorial spread: a greeting, biography, sign-off, and writing links sit in the left column, with three grayscale portraits in an asymmetrical arrangement on the right. At 680px and below, the portrait column moves beneath the text. The greeting uses `clamp(36px, 4vw, 58px)`. The biography has three short paragraphs: an unindented introduction with the college and course in bold, followed by two indented notes with matching decorative arrow marks hidden from assistive technology. The bold “Enjoy your Stay :)” sign-off is unindented and uses the same 19px font as the biography. Numbered sections and fine rules retain the template’s editorial style. Navigation remains visible and wraps on mobile.

- [BaseLayout](src/layouts/BaseLayout.astro): document shell, canonical URL, metadata, and global styles.
- [Navigation](src/components/Navigation.astro): the three section links, reused in the header and footer.
- [Footer](src/components/Footer.astro): branding, navigation, and copyright.
- [ArticleList](src/components/ArticleList.astro): dated article links or an explicit empty state.

Wrap Markdown article bodies in `.prose` for headings, quotes, code blocks, and grayscale images. Preserve visible keyboard focus. Use semantic headings and links with descriptive text.

See [README.md](README.md) for adding Markdown to either collection.
