export interface IncomeStatement {
  date: string;
  symbol: string;
  revenue: number;
  grossProfit: number;
  netIncome: number;
  operatingIncome: number;
  eps: number;
}

export interface FilterState {
  dateRange: {
    start: string;
    end: string;
  };
  revenueRange: {
    min: number;
    max: number;
  };
  netIncomeRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
}