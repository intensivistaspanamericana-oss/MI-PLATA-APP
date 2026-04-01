export const SMMLV_2025 = 1423500;

export interface Expense {
  id: string;
  label: string;
  value: number;
  category: 'fixed' | 'variable';
}

export interface InvestmentOption {
  id: string;
  title: string;
  description: string;
  risk: 'Bajo' | 'Moderado' | 'Alto';
  yield: string;
  minimum: string;
  liquidity: string;
  recommended?: boolean;
  details: { label: string; value: string }[];
  icon: string;
  color: string;
}
