import { useMemo, useState } from 'react'
import { PackageItem } from '@/types'

export function usePackageSelection(allPackages: PackageItem[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectedPackages = useMemo(() => {
    const ids = new Set(selectedIds)
    return allPackages.filter((pkg) => ids.has(pkg.id))
  }, [allPackages, selectedIds])

  const togglePackage = (id: string) => {
    setSelectedIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]))
  }

  const clearSelection = () => {
    setSelectedIds([])
  }

  const isSelected = (id: string) => selectedIds.includes(id)

  return {
    selectedIds,
    selectedPackages,
    selectedCount: selectedIds.length,
    isSelected,
    togglePackage,
    clearSelection,
  }
}
