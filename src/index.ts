import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import { getClientCredentials, getMyBands, getSalesReport } from './Services/bandCampController';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://34.66.213.101:3000',
    'http://localhost:5173',
    "http://34.66.213.101:5432",
    "http://localhost:3001",
  ],
  credentials: true,
}));

app.use('/api', router);

app.listen(3001, '0.0.0.0', async () => {
  console.log('Server is up on port 3001');

  try {
    const clientCreds = await getClientCredentials();
    if (clientCreds) {
      clientCreds.access_token;
      await getMyBands();
      const salesReport = await getSalesReport();
      console.log('Sales Report: ', salesReport);
    } else {
      console.log('No client credentials were retrieved.');
    }
  } catch (error) {
    console.error('An error occurred during initialization:', error);
  }
});
