import { LucideIcon } from 'lucide-react'

export type Category =
  | 'Browsers'
  | 'Development'
  | 'Communication'
  | 'Media'
  | 'Utilities'
  | 'Terminals'
  | 'Others'

export type DistroFamily =
  | 'arch-based'
  | 'debian-based'
  | 'fedora-based'
  | 'opensuse-based'
  | 'alpine-based'
  | 'ubuntu-based'
  | 'kali-based'
  | 'manjaro-based'
  | 'mint-based'
  | 'popos-based'
  | 'zorin-based'
  | 'parrot-based'
  | 'endeavouros-based'
  | 'garuda-based'
  | 'nobara-based'
  | 'cachyos-based'

export interface PackageItem {
  id: string
  name: string
  icon: LucideIcon
  category: Category
  packageName: string
  description: string
  logoUrl?: string
}

export interface MaintenanceCommand {
  id: string
  title: string
  command: string
}
