import { useState, useMemo } from 'react'

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return data.slice(startIndex, startIndex + itemsPerPage)
  }, [data, currentPage, itemsPerPage])

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    totalItems: data.length
  }
}

export const useSorting = (data, initialSort = { field: null, direction: 'asc' }) => {
  const [sortConfig, setSortConfig] = useState(initialSort)

  const sortedData = useMemo(() => {
    if (!sortConfig.field) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.field]
      const bValue = b[sortConfig.field]

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const requestSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return { sortedData, sortConfig, requestSort }
}