import { DistroFamily, PackageItem } from '@/types'

const installPrefixMap: Record<DistroFamily, string> = {
  'arch-based': 'sudo pacman -S',
  'debian-based': 'sudo apt install',
  'fedora-based': 'sudo dnf install',
}

export function buildInstallCommand(distro: DistroFamily, selectedPackages: PackageItem[]): string {
  if (!selectedPackages.length) {
    return ''
  }

  const uniqueSortedPackages = Array.from(new Set(selectedPackages.map((pkg) => pkg.packageName))).sort((a, b) =>
    a.localeCompare(b),
  )

  return `${installPrefixMap[distro]} ${uniqueSortedPackages.join(' ')}`
}
