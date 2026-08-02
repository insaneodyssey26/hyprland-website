# Hyprland Web Showcase

The official web showcase and interactive configuration explorer for my **[hyprland](https://github.com/insaneodyssey26/hyprland)** Arch Linux dotfiles repository.

---

## Key Features

* **Dynamic GitHub Sync**: Live-fetches raw configuration files (`.lua`, `.conf`, `.jsonc`, `.css`) directly from the dotfiles main branch with zero manual maintenance.
* **Animated Wave Scroll Progress**: Custom Awwwards-style scroll tracker built with React math that dynamically expands and glows horizontal indicators based on scroll depth.
* **Curated Config Explorer**: Filterable IDE-like interface with syntax-highlighted code viewing, installation paths, and auto-generated terminal commands.
* **Interactive Screenshot Lightbox**: Tap-to-expand preview modal for desktop screenshots with glassmorphic backdrop filters.
* **Floating Glassmorphic Navbar**: Modern pill navigation with smooth scroll-shrink animations, mobile drawer, and personal portfolio integration.

---

## Tech Stack

* **Framework**: Next.js (App Router)
* **Styling**: Vanilla CSS (Custom Design System & Glassmorphism)
* **Typography**: Geist Sans & Geist Mono
* **Deployment**: Vercel

---

## Local Setup

```bash
git clone https://github.com/insaneodyssey26/hyprland-website.git
cd hyprland-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

---

## Related Repositories

* **[insaneodyssey26/hyprland](https://github.com/insaneodyssey26/hyprland)** — Core Arch Linux desktop environment configurations, theme pipelines, and scripts.
