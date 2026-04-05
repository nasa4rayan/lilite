import { DistroFamily, PackageItem } from '@/types'

const installPrefixMap: Record<DistroFamily, string> = {
  'arch-based': 'sudo pacman -S',
  'debian-based': 'sudo apt install',
  'fedora-based': 'sudo dnf install',
  'opensuse-based': 'sudo zypper install',
  'alpine-based': 'sudo apk add',
  'ubuntu-based': 'sudo apt install',
  'kali-based': 'sudo apt install',
  'manjaro-based': 'sudo pacman -S',
  'mint-based': 'sudo apt install',
  'popos-based': 'sudo apt install',
  'zorin-based': 'sudo apt install',
  'parrot-based': 'sudo apt install',
  'endeavouros-based': 'sudo pacman -S',
  'garuda-based': 'sudo pacman -S',
  'nobara-based': 'sudo dnf install',
}

const yaySupported: DistroFamily[] = ['arch-based', 'manjaro-based', 'endeavouros-based', 'garuda-based']

type BuildCommandOptions = {
  useCommunityHelper?: boolean
}

export function buildInstallCommand(
  distro: DistroFamily,
  selectedPackages: PackageItem[],
  options?: BuildCommandOptions,
): string {
  if (!selectedPackages.length) {
    return ''
  }

  const uniqueSortedPackages = Array.from(new Set(selectedPackages.map((pkg) => pkg.packageName))).sort((a, b) =>
    a.localeCompare(b),
  )

  const prefix = options?.useCommunityHelper && yaySupported.includes(distro) ? 'yay -S' : installPrefixMap[distro]

  return `${prefix} ${uniqueSortedPackages.join(' ')}`
}

export function supportsCommunityHelper(distro: DistroFamily): boolean {
  return yaySupported.includes(distro)
}
