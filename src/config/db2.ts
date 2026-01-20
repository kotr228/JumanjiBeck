import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
  user: 'v73fwwxNCgoBNeM.root',
  password: 'LsdrxxCC8bCUb5BQ',
  database: 'test',
  port: 4000,       // <--- ВАЖЛИВО: Для TiDB це обов'язково
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
