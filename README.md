# Lilite

Lilite is a frontend-only Linux command builder inspired by Ninite.
It helps users generate one safe grouped install command from official repositories.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui style components (`src/components/ui`)
- React Router
- Lucide React Icons
- Optional helpers: `clsx`, `tailwind-merge`

## Routes

- `/` HomePage
- `/get-started` DistroChooserPage
- `/distro/arch-based`
- `/distro/debian-based`
- `/distro/fedora-based`
- `*` NotFoundPage

## Project Structure

- `src/components/` shared UI and feature components
- `src/components/ui/` shadcn/ui-style primitives (`Button`, `Card`, `Input`, `Badge`)
- `src/pages/` route pages (home, chooser, distro pages, 404)
- `src/data/` typed local datasets and distro metadata
- `src/types/` domain types (`PackageItem`, `Category`, `DistroFamily`)
- `src/hooks/` reusable hooks (`usePackageSelection`, `useTheme`)
- `src/lib/` utilities (`commandBuilder`, filtering, class merge helper)

## Command Builder Logic

`src/lib/commandBuilder.ts` builds exactly one grouped install command per distro:

- Arch-based: `sudo pacman -S ...`
- Debian-based: `sudo apt install ...`
- Fedora-based: `sudo dnf install ...`

Behavior:

- removes duplicates (`Set`)
- sorts package names for stable output
- returns an empty string for no selection

## Local Data + Logos

`src/data/packages.ts` now contains **150 total packages** from official repositories:

- 50 Arch-based
- 50 Debian-based
- 50 Fedora-based

The dataset uses a tuple-to-object factory for maintainability and adds optional `logoUrl` on `PackageItem`.
Package cards render real app logos where available (for example Firefox, Chromium, Git, Docker, Node.js, Python, VLC, OBS Studio, GIMP, Telegram) and gracefully fall back to a Lucide icon if a logo is missing or fails to load.

Branding marks across the UI are served from `src/assets/logo.png` via `src/components/LogoMark.tsx`.

## Add More Packages Later

1. Open `src/data/packages.ts`.
2. Add a tuple entry to the target distro list:
   - `key`
   - display `name`
   - `category`
   - official `packageName`
   - fallback icon
   - optional logo URL
3. Keep package names tied to official repositories only.
4. No command-builder changes are needed unless you add a new distro family.

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```
