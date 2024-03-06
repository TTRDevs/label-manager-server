import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  // host: '154.56.40.230',
  host: 'localhost',
  database: 'postgres',
  password: 'DataBase123@',
  port: 5432,
});

export default pool;