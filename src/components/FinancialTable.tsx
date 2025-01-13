import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import type { IncomeStatement } from '../types/financial';

const formatMillions = (value: number) => {
  // Convert to millions and format with 2 decimal places
  const millions = value / 1_000_000;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(millions);
};

export const FinancialTable: React.FC = () => {
  const { financialData, sortConfig, setSortConfig, filters } = useStore();

  const handleSort = (key: keyof IncomeStatement) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // First sort the data
  const sortedData = [...financialData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    return sortConfig.direction === 'asc'
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  // Then apply filters only if they are actively set
  const filteredData = sortedData.filter((item) => {
    // Date filter - only apply if either start or end date is set
    const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
    const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
    const itemDate = new Date(item.date);

    if (startDate || endDate) {
      if (startDate && endDate) {
        if (!(itemDate >= startDate && itemDate <= endDate)) return false;
      } else if (startDate && !(itemDate >= startDate)) {
        return false;
      } else if (endDate && !(itemDate <= endDate)) {
        return false;
      }
    }

    // Revenue filter - only apply if min or max is set to non-default values
    const revenueInMillions = item.revenue / 1_000_000;
    if (filters.revenueRange.min > 0 && revenueInMillions < filters.revenueRange.min) {
      return false;
    }
    if (filters.revenueRange.max < Number.MAX_SAFE_INTEGER && revenueInMillions > filters.revenueRange.max) {
      return false;
    }

    // Net Income filter - only apply if min or max is set to non-default values
    const netIncomeInMillions = item.netIncome / 1_000_000;
    if (filters.netIncomeRange.min > 0 && netIncomeInMillions < filters.netIncomeRange.min) {
      return false;
    }
    if (filters.netIncomeRange.max < Number.MAX_SAFE_INTEGER && netIncomeInMillions > filters.netIncomeRange.max) {
      return false;
    }

    // Search filter - only apply if there's a search query
    if (filters.searchQuery) {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    return true;
  });

  if (financialData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Search for a stock symbol to view financial data.</p>
        <p className="text-sm mt-2">Example symbols: AAPL, MSFT, GOOGL</p>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data matches the current filter criteria.</p>
        <p className="text-sm mt-2">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
            {[
              { key: 'date', label: 'Date' },
              { key: 'revenue', label: 'Revenue (M)' },
              { key: 'netIncome', label: 'Net Income (M)' },
              { key: 'grossProfit', label: 'Gross Profit (M)' },
              { key: 'eps', label: 'EPS' },
              { key: 'operatingIncome', label: 'Operating Income (M)' },
            ].map(({ key, label }) => (
              <th
                key={key}
                className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400"
              >
                <button
                  className="inline-flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={() => handleSort(key as keyof IncomeStatement)}
                >
                  <span>{label}</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className="border-b transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            >
              <td className="p-4 font-medium">
                {format(new Date(item.date), 'MMM d, yyyy')}
              </td>
              <td className="p-4">{formatMillions(item.revenue)}</td>
              <td className="p-4">{formatMillions(item.netIncome)}</td>
              <td className="p-4">{formatMillions(item.grossProfit)}</td>
              <td className="p-4">${item.eps.toFixed(2)}</td>
              <td className="p-4">{formatMillions(item.operatingIncome)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};