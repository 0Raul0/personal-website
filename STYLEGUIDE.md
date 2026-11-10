# Style Guide

Source of truth: [src/styles/global.scss](src/styles/global.scss).

The site preserves Self Esteem’s editorial language: warm paper (`#f1eadc`), ink (`#121418`), thin rules (`#a29b8d`), oversized headings, and italic accents. Colour comes from flat, irregularly arranged patches inspired by faded book jackets and cloth. Avoid gradients and shadows.

## Patchwork palette

| Colour     | Hex       | Placement                                |
| ---------- | --------- | ---------------------------------------- |
| Warm paper | `#f1eadc` | Site background                          |
| Ochre      | `#e3bc64` | Blog, first portrait frame               |
| Faded rust | `#dba38f` | Third portrait frame                     |
| Sage       | `#b8c5ad` | About navigation and introduction note   |
| Dusty blue | `#a6bdcc` | Literature Review, second portrait frame |
| Rust ink   | `#934430` | Italic surname on the paper background   |

Use dark ink on every pastel patch. Keep the portraits monochrome. The shared four-square mark and footer seam carry the palette across sections without creating extra content. Active navigation keeps its underline as well as its colour.

## Typography

- Space Grotesk: headings and branding.
- Inter: body copy and navigation.
- Playfair Display Italic: emphasis, dates, and pull quotes.

Page titles use `clamp(40px, 7vw, 88px)`. Prose uses 18px type with 1.65 line height and a maximum width of 65 characters. Keep heading letter spacing tight.

## Layout and components

All three sections share [PageLayout](src/layouts/PageLayout.astro), with a top navigation, a maximum 920px main column, and a footer. About uses a wider editorial spread: all copy and writing links sit in the left column, with three grayscale portraits in an asymmetrical arrangement on the right. At 680px and below, the portrait column moves beneath the text. Oversized mixed sans-serif and italic-serif name typography, numbered sections, and fine rules tie it to the original template. Navigation remains visible and wraps on mobile.

- [BaseLayout](src/layouts/BaseLayout.astro): document shell, canonical URL, metadata, and global styles.
- [Navigation](src/components/Navigation.astro): the three section links, reused in the header and footer.
- [Footer](src/components/Footer.astro): branding, navigation, and copyright.
- [ArticleList](src/components/ArticleList.astro): dated article links or an explicit empty state.

Wrap Markdown article bodies in `.prose` for headings, quotes, code blocks, and grayscale images. Preserve visible keyboard focus. Use semantic headings and links with descriptive text.

See [README.md](README.md) for adding Markdown to either collection.
