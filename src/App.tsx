import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { StockSearch } from './components/StockSearch';
import { FinancialTable } from './components/FinancialTable';
import { useStore } from './store/useStore';
import type { IncomeStatement } from './types/financial';

function App() {
  const { selectedStock, setFinancialData } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedStock) return;

    const controller = new AbortController();
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setFinancialData([]);

      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const baseUrl = import.meta.env.VITE_BASE_URL;

        if (!apiKey || !baseUrl) {
          throw new Error('API configuration is missing');
        }

        const response = await fetch(
          `${baseUrl}/income-statement/${selectedStock}?apikey=${apiKey}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(response.status === 429 ? 'Rate limit exceeded' : 'Failed to fetch data');
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No data available');
        }

        const mappedData: IncomeStatement[] = data.map(item => ({
          date: item.date,
          symbol: item.symbol,
          revenue: Number(item.revenue) || 0,
          grossProfit: Number(item.grossProfit) || 0,
          netIncome: Number(item.netIncome) || 0,
          operatingIncome: Number(item.operatingIncome) || 0,
          eps: Number(item.eps) || 0,
        }));

        setFinancialData(mappedData);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setFinancialData([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [selectedStock, setFinancialData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <StockSearch />
          <Filters />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2">Loading financial data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 font-medium">{error}</p>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  Please check your API configuration and try again
                </p>
              </div>
            ) : (
              <FinancialTable />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;