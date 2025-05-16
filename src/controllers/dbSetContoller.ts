import { Request, Response } from 'express';
import pool from '../config/db';

export const getMenuKategory = (req: Request, res: Response) => {
  pool.query('SELECT * FROM MenuKategory', (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      return res.status(500).json({ message: 'Error fetching data from MenuKategory', error: err });
    }
    res.json(results);
  });
};

export const getMenuFood = (req: Request, res: Response) => {
  pool.query('SELECT * FROM MenuFood', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data from table2' });
    }
    res.json(results);
  });
};

export const getBarMenuKategory = (req: Request, res: Response) => {
  pool.query('SELECT * FROM BarMenuKategory', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data from table3' });
    }
    res.json(results);
  });
};

export const getBarMenuFood = (req: Request, res: Response) => {
  pool.query('SELECT * FROM BarMenuFood', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data from table4' });
    }
    res.json(results);
  });
};
