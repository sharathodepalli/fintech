import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

export const StockSearch: React.FC = () => {
  const { selectedStock, setSelectedStock } = useStore();
  const [inputValue, setInputValue] = useState(selectedStock);

  const handleSearch = () => {
    setSelectedStock(inputValue.toUpperCase());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="max-w-2xl mx-auto">
        <label htmlFor="stock-search" className="block text-lg font-semibold mb-2">
          Search Stock Symbol
        </label>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <input
              id="stock-search"
              type="search"
              placeholder="Search for stocks by symbol (e.g., AAPL, TSLA, MSFT)"
              className="flex h-12 w-full rounded-md border border-input bg-white pl-10 pr-4 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium flex items-center justify-center"
          >
            Search
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter a stock symbol to view its financial data
        </p>
      </div>
    </div>
  );
};