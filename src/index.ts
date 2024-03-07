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
import { BandcampSalesReport } from './Models/BandCampSchema'; // Assuming the SaleItem type is here

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
      const accessToken = clientCreds.access_token; // Make sure to use the accessToken
      await ensureValidAccessToken(); // Ensure we have a valid access token before making further calls
      await getMyBands();
      const salesReport = await getSalesReport(); // This should return the structured data
      console.log('Retrieved sales report data:', salesReport);
      if (salesReport && Array.isArray(salesReport)) {
        // If the data is in the expected array format, process it further
        await fetchDataFromService(salesReport); // Directly pass the array to the service function
        console.log('Sales Report processing complete.');
      } else {
        console.log('No sales report data was retrieved or the data is not in the expected format.');
      }
    } else {
      console.log('No client credentials were retrieved.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
