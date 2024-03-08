// index.ts

import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import {
  ensureValidAccessToken,
  getClientCredentials,
  getMyBands,
  getSalesReport
} from './Services/bandCampController';
import dotenv from 'dotenv';
import { fetchDataFromService } from './Services/DatabaseApiFetch';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://34.66.213.101:3000',
    'http://localhost:5173',
    'http://34.66.213.101:5432',
    'http://localhost:3001',
  ],
  credentials: true,
}));

app.use('/api', router);

app.listen(3001, '0.0.0.0', async () => {
  console.log('Server is up on port 3001');
  try {
      const clientCreds = await getClientCredentials();
      if (clientCreds) {
          const accessToken = clientCreds.access_token;
          await ensureValidAccessToken();
          await getMyBands();
          try {
              const salesReport = await getSalesReport(3460825363, "2024-01-01", "2024-12-31");
              //Debug Log:
              //console.log('Retrieved sales report data:', salesReport);
              if (Array.isArray(salesReport)) {
                  await fetchDataFromService(salesReport);
                  console.log('Sales Report processing complete.');
              } else {
                  console.log('No sales report data was retrieved or the data is not in the expected format.');
              }
          } catch (error) {
              console.error('Error retrieving sales report:', error);
          }
      } else {
          console.log('No client credentials were retrieved.');
      }
  } catch (error) {
      console.error('An error occurred:', error);
  }
});
