# Zeteoh Corporate Website

This is the official corporate website for Zeteoh, built with modern web technologies to deliver a fast, accessible, and internationalized experience.

## 🚀 Features

- **Modern Stack**: Built with SvelteKit and Svelte 5
- **Internationalization**: Full support for English and Japanese
- **Blog & News System**: MDX-powered content management
- **Design System**: Custom components using shadcn-svelte
- **Performance**: Server-side rendering and static site generation
- **Accessibility**: WCAG compliant with full keyboard navigation
- **Dark Mode**: System-aware theme switching

## 📦 Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Web application framework
- [Svelte 5](https://svelte.dev/) - UI framework with runes
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) - UI components
- [MDsveX](https://github.com/pngwn/MDsveX) - Markdown processing
- [Netlify](https://www.netlify.com/) - Hosting and forms

## 🏗️ Project Structure

```
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── i18n/          # Translation files
│   │   ├── layouts/       # Page layouts
│   │   └── stores/        # Svelte stores
│   ├── content/
│   │   ├── blog/          # Blog posts (MDX)
│   │   │   ├── en/
│   │   │   └── ja/
│   │   └── news/          # News articles (MDX)
│   │       ├── en/
│   │       └── ja/
│   └── routes/            # SvelteKit routes
├── static/                # Static assets
└── tests/                 # Test files
```

## 🛠️ Development

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Setup

1. Clone the repository:

```bash
git clone https://github.com/zeteoh/corporate-website.git
cd corporate-website
```

2. Install dependencies:

```bash
pnpm install
```

3. Start development server:

```bash
pnpm dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PUBLIC_ORIGIN=http://localhost:5173
```

For production, set the appropriate values in your hosting platform.

## 📝 Content Management

### Blog Posts

Add new blog posts in `src/content/blog/{lang}/` following the format:

```md
---
title: 'Post Title'
description: 'Post description'
date: '2025-01-01'
published: true
author:
  name: 'Author Name'
  avatar: '/images/authors/name.png'
  bio: 'Author bio'
thumbnail:
  url: '/images/blog/post-image.png'
  alt: 'Image description'
---

Post content here...
```

### Translations

1. Add new translation keys in `src/lib/i18n/translations/`
2. Update types in `src/lib/i18n/types.ts`
3. Use translations with:

```typescript
const t = translations[currentLanguage];
```

## 🚢 Deployment

The site automatically deploys to Netlify on push to the main branch.

### Build

```bash
pnpm build
```

### Preview Build

```bash
pnpm preview
```

## 📱 Browser Support

- Modern evergreen browsers
- Chrome/Edge 90+
- Firefox 90+
- Safari 14+

## 🌐 Internationalization

The site supports English and Japanese with dynamic language switching. Content and UI elements are fully translated.

### Adding a New Language

1. Add language code to `KNOWN_LANGUAGES` in `src/routes/+layout.ts`
2. Create translation files in `src/lib/i18n/translations/`
3. Add content folders in `src/content/{blog,news}/`

## 📄 License

Copyright © 2024 Zeteoh, Inc. All rights reserved.
