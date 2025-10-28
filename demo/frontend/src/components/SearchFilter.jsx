import React, { useState } from 'react'
import { Search, Filter, X, ChevronDown } from 'lucide-react'

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  filters = [], 
  activeFilters = {}, 
  onFilterChange,
  placeholder = "Search...",
  className = "",
  showMoreFilters = false,
  onToggleMoreFilters
}) => {
  const clearAllFilters = () => {
    filters.forEach(filter => {
      onFilterChange(filter.key, 'All')
    })
    onSearchChange('')
  }

  const hasActiveFilters = searchTerm || Object.values(activeFilters).some(value => value !== 'All')

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {filters.slice(0, 2).map((filter) => (
            <select
              key={filter.key}
              value={activeFilters[filter.key] || 'All'}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
          
          {filters.length > 2 && onToggleMoreFilters && (
            <button 
              onClick={onToggleMoreFilters}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
            </button>
          )}
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>
      
      {showMoreFilters && filters.length > 2 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
          {filters.slice(2).map((filter) => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label || filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}
              </label>
              <select
                value={activeFilters[filter.key] || 'All'}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchFilter