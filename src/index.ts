import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import { getMyBands, getClientCredentials, getSalesReport } from './Services/bandCampController';
import dotenv from 'dotenv'

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://34.66.213.101:3000',
    'http://localhost:5173',
    'http://localhost:5173/*',
    "http://34.66.213.101:5432",
    "http://localhost:3000"
  ],
  credentials: true,
}));

app.use('/api', router);


app.listen(3000, '0.0.0.0', async () => {
  console.log('Server is up on port 3000');


  try {
    const clientCreds = await getClientCredentials();
    const aTok = await clientCreds!.access_token
    await getMyBands();

    const salesReport = await getSalesReport();
    console.log('Sales Report: ', salesReport)
    return salesReport
  } catch (error) {
    console.error('An error occurred during initialization:', error);
  }
});
