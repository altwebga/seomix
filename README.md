# The GridCN

<div align="center">

<img width="1280" height="640" alt="image" src="https://github.com/user-attachments/assets/4efc27a3-768d-4c6a-88ab-6af3a8452d61" />

---

**An authentic Tron: Ares inspired theme system for shadcn/ui**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**🌐 [Live Demo](https://seomix.ru)**

_Enter the Grid. Build immersive digital experiences._

</div>

---

## 🌟 Overview

**The GridCN** is a comprehensive design system that brings the iconic visual language of _Tron: Ares_ to modern web development. Built on top of [shadcn/ui](https://ui.shadcn.com/), it provides 50+ fully-styled components, 6 Greek god-inspired themes, movie-accurate UI elements, and immersive 3D effects powered by Three.js.

🌐 **Visit the live site:** [thegridcn.com](https://seomix.ru) | [Components Showcase](https://seomix.ru/components)

### Key Features

- 🎨 **6 Unique Themes** - Greek god-inspired color schemes (Ares, Tron, Clu, Athena, Aphrodite, Poseidon)
- 🧩 **50+ Components** - Complete shadcn/ui library with authentic Tron styling
- 🎬 **Movie UI Elements** - Data cards, HUD components, timers, alerts, and radar displays
- ✨ **3D Effects** - Immersive Three.js grid, particles, and light beams
- 🎯 **Glow Utilities** - CSS utilities for neon glows, scanlines, and pulsing animations
- 🔒 **TypeScript** - Full type safety with comprehensive TypeScript definitions
- 🎭 **Theme Switching** - Dynamic theme system with persistent storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/project-ares.git
cd project-ares

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📦 Project Structure

```
project-ares/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── components/      # Components showcase page (/components)
│   │   │   └── page.tsx     # Components page
│   │   ├── page.tsx         # Homepage (/)
│   │   └── globals.css      # Global styles & theme definitions
│   ├── components/
│   │   ├── ui/              # shadcn/ui base components (55+)
│   │   ├── thegridcn/       # Tron-inspired UI, 3D, effects, and movie components
│   │   ├── theme/           # Theme provider & switcher
│   │   ├── showcase/        # Component showcase sections
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── registry/            # Component registry config
├── public/                  # Static assets
└── components.json          # shadcn/ui configuration
```

### Pages

The project consists of two main pages:

- **Home** (`/`) - Landing page with theme selector, features, and project overview
- **Components** (`/components`) - Interactive showcase of all available components

## 🎨 Themes

The GridCN includes 6 unique themes inspired by Greek mythology and Tron characters:

| Theme         | Color            | Inspiration                   |
| ------------- | ---------------- | ----------------------------- |
| **Ares**      | Red (#ff3333)    | God of War - Main movie theme |
| **Tron**      | Cyan (#00d4ff)   | User - Classic Tron aesthetic |
| **Clu**       | Orange (#ff6600) | Program - Antagonist theme    |
| **Athena**    | Gold (#ffd700)   | Goddess of Wisdom             |
| **Aphrodite** | Pink (#ff1493)   | Goddess of Love               |
| **Poseidon**  | Blue (#0066ff)   | God of Sea                    |

Each theme includes:

- Custom color palettes with OKLCH color space
- Glow effects matching the theme color
- Chart color schemes
- Sidebar styling
- Border and accent colors

## 🧩 Components

### Standard UI Components

All shadcn/ui components are available with Tron styling:

- **Layout**: Card, Separator, Sidebar, Sheet, Drawer
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- **Navigation**: Button, Navigation Menu, Menubar, Breadcrumb, Pagination
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton, Spinner
- **Overlays**: Dialog, Popover, Tooltip, Hover Card, Context Menu
- **Data Display**: Table, Chart, Avatar, Badge, Calendar
- **And more...**

### Tron-Specific Components

- `TronReticle` - Scanning reticle overlay
- `TronDossierCard` - Movie-accurate data card
- `TronStatusStrip` - HUD status bar
- `TronUplinkHeader` - Header bar with system info
- `TronRadar` - Proximity radar display
- `TronDerezCountdown` - De-resolution timer
- `TronGridMap` - Grid map overlay
- `TronGridScanOverlay` - Scanning grid effect
- `TronThemeDossierSelector` - Theme selector with dossier cards

### 3D Components

- `TronGrid3D` - Interactive 3D grid with particles and light beams
- `TronTunnel` - 3D tunnel effect
- `TronGrid` - 3D grid floor

## 🎯 Usage

### Theme Provider

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from "@/components/theme";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider defaultTheme="ares">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Using Themes

```tsx
import { useTheme } from "@/components/theme";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return <button onClick={() => setTheme("tron")}>Switch to Tron theme</button>;
}
```

### Using Components

```tsx
import { Button } from "@/components/ui/button";
import { DataCard } from "@/components/thegridcn";

export function MyPage() {
  return (
    <div>
      <Button>Enter the Grid</Button>
      <DataCard
        subtitle="PROGRAM"
        title="FLYNN"
        status="active"
        fields={[
          { label: "STATUS", value: "ACTIVE" },
          { label: "TYPE", value: "USER" },
        ]}
      />
    </div>
  );
}
```

## ⚙️ Configuration

### Customization

The theme system uses CSS custom properties (CSS variables) defined in `src/app/globals.css`. You can customize:

- Color schemes by modifying the theme CSS variables
- Border radius by adjusting `--radius` values
- Font families via `--font-orbitron` and `--font-rajdhani`
- Glow effects through `--glow` and `--glow-muted` variables

## 🛠️ Tech Stack

- **[Next.js 16.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

## 📚 Usage Guide

### Viewing Components

The project includes two pages:

- **Home Page** ([thegridcn.com](https://seomix.ru)) - Features the theme system, project overview, and key information
- **Components Page** ([thegridcn.com/components](https://seomix.ru/components)) - Interactive showcase of all 50+ components with live examples

### Theme System

Themes are defined using CSS custom properties in `src/app/globals.css`. Each theme uses the `[data-theme="theme-name"]` selector to apply its color scheme.

### Styling Guide

- Use Tailwind utility classes for layout and spacing
- Leverage CSS variables for theme-aware colors
- Apply glow effects using the `glow-text` utility class
- Use border utilities with `border-primary` for Tron-style borders

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy!

The project is optimized for Vercel's platform and will work out of the box.

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Next.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Any Node.js hosting service

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Tron: Ares](https://www.imdb.com/title/tt11040010/) for visual inspiration
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Three.js](https://threejs.org/) for 3D capabilities

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Visit the [live site](https://seomix.ru) to see components in action
- Check the [Usage Guide](#-usage-guide) section above

---

<div align="center">

**Built with ❤️ for the Grid**

_End of Line_

</div>
