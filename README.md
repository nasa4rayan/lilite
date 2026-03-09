<p align="center">
  <img src="src/assets/logo.png" alt="Lilite Logo" width="96" />
  <br />
  <h2 align="center">Lilite</h2>
  <p align="center">A clean Linux command builder inspired by Ninite.</p>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-111827?logo=vercel&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
  <img alt="Status" src="https://img.shields.io/badge/Status-Active-22c55e" />
</p>

## Overview

Lilite is a Linux command builder inspired by Ninite.  
It helps users generate install commands for common Linux apps and packages across:

<p>
  <img alt="Arch-based" src="https://img.shields.io/badge/Arch-1793D1?logo=archlinux&logoColor=white" />
  <img alt="Fedora-based" src="https://img.shields.io/badge/Fedora-51A2DA?logo=fedora&logoColor=white" />
  <img alt="Debian-based" src="https://img.shields.io/badge/Debian-A81D33?logo=debian&logoColor=white" />
</p>

> Lilite only generates commands. It never installs software automatically.

## Why Lilite?

- Fast, minimal workflow
- Transparent command output
- Official repositories only
- No scripts, no hidden execution

## Key Features

- Distro family selection
- Package/app selection UI
- Live command preview flow
- One grouped install command output
- Copy command with one click
- Official repositories only (no AUR, Snap, Flatpak, COPR, AppImage, or external repos)

## Routes

| Route                  | Purpose              |
| ---------------------- | -------------------- |
| `/`                    | Home page            |
| `/get-started`         | Distro chooser       |
| `/distro/arch-based`   | Arch-based builder   |
| `/distro/debian-based` | Debian-based builder |
| `/distro/fedora-based` | Fedora-based builder |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/med6ba/lilite.git
cd lilite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

## Contributing

Contributions are welcome. You can help by:

- adding more verified apps/packages from official repositories
- improving the website and layout
- refining UI/UX details
- fixing bugs
- improving code quality and maintainability

Please keep contributions aligned with Lilite’s core behavior: safe, manual command generation only.

## License

This project is licensed under the MIT License.  
See [LICENSE](LICENSE) for details.

## Copyright

© 2026 Lilite. All rights reserved.
