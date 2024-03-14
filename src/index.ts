import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import dotenv from 'dotenv';
import './Services/scheduler';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://154.56.40.230:3000',
    'http://154.56.40.230:3001',
    'http://154.56.40.230:5432',
    'http://localhost:5173',
    'http://localhost:5432',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://recordlabelmanager.com',
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
