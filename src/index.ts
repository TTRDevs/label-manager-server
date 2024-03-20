import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import dotenv from 'dotenv';
import http from 'http'; // Use the http module
import './Services/scheduler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'https://154.56.40.230:3000',
    'https://154.56.40.230:3001',
    'https://154.56.40.230:5432',
    'https://localhost:5173',
    'https://localhost:5432',
    'https://localhost:3001',
    'https://localhost:3000',
    'https://metabase.recordlabelmanager.com',
    'https://server.recordlabelmanager.com',
    'https://recordlabelmanager.com',
    'https://recordlabelmanager.com/app/data-analysis',
  ],
  credentials: true,
}));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Label Manager Server!');
});

// Create an HTTP server rather than HTTPS
const httpServer = http.createServer(app);

// The server should listen on all network interfaces
httpServer.listen(3001, '0.0.0.0', () => {
  console.log('HTTP Server is up on port 3001');
});


// import express from 'express';
// import cors from 'cors';
// import router from './Routes/routes';
// import dotenv from 'dotenv';
// import https from 'https';
// import fs from 'fs';
// import path from 'path';
// import './Services/scheduler';

// dotenv.config();
// const privateKeyPath = path.join('/etc/letsencrypt/live/recordlabelmanager.com', 'privkey.pem');
// const certificatePath = path.join('/etc/letsencrypt/live/recordlabelmanager.com', 'fullchain.pem');

// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
// const certificate = fs.readFileSync(certificatePath, 'utf8');

// const credentials = { key: privateKey, cert: certificate };

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: process.env.CORS_ORIGIN?.split(',') || [
//     'https://154.56.40.230:3000',
//     'https://154.56.40.230:3001',
//     'https://154.56.40.230:5432',
//     'https://localhost:5173',
//     'https://localhost:5432',
//     'https://localhost:3001',
//     'https://localhost:3000',
//     'https://metabase.recordlabelmanager.com',
//     'https://server.recordlabelmanager.com',
//     'https://recordlabelmanager.com',
//     'https://recordlabelmanager.com/app/data-analysis',
//   ],
//   credentials: true,
// }));

// app.use('/api', router);

// app.get('/', (req, res) => {
//   res.send('Hello, welcome to the Label Manager Server!');
// });

// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(3001, () => {
//   console.log('HTTPS Server is up on port 3001');
// });
