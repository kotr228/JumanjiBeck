// types/Order.ts
export interface Order {
  customer_name: string;
  products: string;     // Кома-сепарований список, або JSON-рядок
  prices: string;       // Кома-сепарований список, або JSON-рядок
  total: number;
  operator?: string;
  table_number: string;
}
