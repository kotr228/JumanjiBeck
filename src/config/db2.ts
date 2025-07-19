import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'nkloqzcz_kote',
  password: 'Sillver-228',
  database: 'nkloqzcz_Jumanji',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
