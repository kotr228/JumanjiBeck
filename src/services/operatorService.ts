import pool from '../config/db2';
import { ResultSetHeader } from 'mysql2';
import { Operator } from '../types/Operator';

export const createOperator = async (operator: Operator) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO operators (name, phone, telegram_nick) VALUES (?, ?, ?)`,
    [operator.name, operator.phone, operator.telegram_nick]
  ) as [ResultSetHeader, any];

  return result.insertId;
};

export const deleteOperator = async (id: number) => {
  const [result] = await pool.execute(
    `DELETE FROM operators WHERE id = ?`,
    [id]
  );

  return result;
};

export const getAllOperators = async (): Promise<Operator[]> => {
  const [rows] = await pool.query('SELECT * FROM operators');
  return rows as Operator[];
};