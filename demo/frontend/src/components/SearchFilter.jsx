import React from 'react'
import { Search, Filter, X } from 'lucide-react'

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  filters = [], 
  activeFilters = {}, 
  onFilterChange,
  placeholder = "Search...",
  className = ""
}) => {
  return (
    <div className={`flex flex-col md:flex-row gap-4 items-center ${className}`}>
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
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={activeFilters[filter.key] || filter.options[0]?.value || ''}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
        
        <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  )
}

export default SearchFilter