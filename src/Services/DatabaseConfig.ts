import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { BandcampSalesReport } from '../Models/BandcampDbSchema';
import { LabelworkxSalesReport } from '../Models/LabelworkxDbSchema';

interface BandcampDatabase {
  sales_report: BandcampSalesReport;
}

interface LabelworkxDatabase {
  labelworkx_sales_report: LabelworkxSalesReport;
}

const pool = new Pool({
  user: 'postgres',
  host: 'label-manager-database',
  database: 'postgres',
  password: 'DataBase123@',
  port: 5432,
});

export const bandcampdb = new Kysely<BandcampDatabase>({
  dialect: new PostgresDialect({ pool }),
});

export const labelworkxdb = new Kysely<LabelworkxDatabase>({
  dialect: new PostgresDialect({ pool }),
});