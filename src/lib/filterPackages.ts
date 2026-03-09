import { Category, PackageItem } from '@/types'

export function filterPackages(items: PackageItem[], searchTerm: string, category: Category | 'All'): PackageItem[] {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const matchesSearch =
      !normalizedSearch ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.packageName.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch)
    return matchesCategory && matchesSearch
  })
}
