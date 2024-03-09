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

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Label Manager Server!');
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Server is up on port 3001');
});
