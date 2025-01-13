import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

export const Filters: React.FC = () => {
  const { filters, setFilters } = useStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'revenue' | 'netIncome',
    field: 'min' | 'max'
  ) => {
    const value = e.target.value;
    const numberValue = value === '' ? (field === 'min' ? 0 : Number.MAX_SAFE_INTEGER) : Number(value);
    
    setFilters({
      [`${type}Range`]: {
        ...filters[`${type}Range`],
        [field]: numberValue,
      },
    });
  };

  const getInputValue = (value: number): string => {
    if (value === 0 || value === Number.MAX_SAFE_INTEGER) return '';
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>

        <div className={`${isCollapsed ? 'hidden' : 'block'} space-y-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date Range</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                  value={filters.dateRange.start || ''}
                  onChange={(e) =>
                    setFilters({
                      dateRange: { ...filters.dateRange, start: e.target.value },
                    })
                  }
                />
                <input
                  type="date"
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                  value={filters.dateRange.end || ''}
                  onChange={(e) =>
                    setFilters({
                      dateRange: { ...filters.dateRange, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Revenue Range (in millions)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                  value={getInputValue(filters.revenueRange.min)}
                  onChange={(e) => handleNumberInput(e, 'revenue', 'min')}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                  value={getInputValue(filters.revenueRange.max)}
                  onChange={(e) => handleNumberInput(e, 'revenue', 'max')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Net Income Range (in millions)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                  value={getInputValue(filters.netIncomeRange.min)}
                  onChange={(e) => handleNumberInput(e, 'netIncome', 'min')}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                  value={getInputValue(filters.netIncomeRange.max)}
                  onChange={(e) => handleNumberInput(e, 'netIncome', 'max')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};