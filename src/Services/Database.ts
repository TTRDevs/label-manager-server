import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { BandcampSalesReport } from '../Models/BandCampSchema';

interface Database {
  sales_report: BandcampSalesReport;
}

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'DataBase123@',
  port: 5432,
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});

// const pool = new Pool({
//   user: 'postgres',
//   // host: '154.56.40.230',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'DataBase123@',
//   port: 5432,
// });

// export default pool;