import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: '34.66.213.101',
  database: 'postgres',
  password: 'DengueDashboard',
  port: 5432,
});

export default pool;