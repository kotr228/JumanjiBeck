import pool from '../config/db2';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Order } from '../types/Order';

interface OrderData {
  customer_name: string;
  products: string[]; // масив назв страв
  prices: number[];   // масив цін
  total: number;
  operator: string;
  table_number: number;
}

export const createOrder = async (order: OrderData): Promise<number> => {
  const { customer_name, products, prices, total, operator, table_number } = order;

  // Серіалізуємо масиви у рядки JSON
  const productsJson = JSON.stringify(products);
  const pricesJson = JSON.stringify(prices);

  const [result] = await pool.execute(
    `INSERT INTO orders (customer_name, products, prices, total, operator, table_number) VALUES (?, ?, ?, ?, ?, ?)`,
    [customer_name, productsJson, pricesJson, total, operator, table_number]
  );

  // @ts-ignore - залежить від типу результату
  return result.insertId;
};

export const getAllOrders = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM orders ORDER BY created_at DESC`);
  return rows;
};
