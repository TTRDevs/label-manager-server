import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import dotenv from 'dotenv';
import http from 'http';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(express.json());

// Using a single domain for simplicity, update if needed
const allowedOrigins = ['https://recordlabelmanager.com', 'https://www.recordlabelmanager.com', 'https://server.recordlabelmanager.com', 'https://metabase.recordlabelmanager.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: false, // false since you don't have user authentication
}));

const pgSession = connectPgSimple(session);

// Generate a session secret once and keep it consistent across server restarts
const sessionSecret = "b31c169f-b0eb-443f-a2bf-f4b87d0844eb";

app.use(session({
  store: new pgSession({
    conString: `postgres://${process.env.POSTGRES_USER}:${encodeURIComponent(process.env.POSTGRES_PASSWORD!)}@label-manager-database:5432/${process.env.POSTGRES_DB}`
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Should be true in production if using HTTPS
    httpOnly: true,
    sameSite: 'lax' // lax is appropriate if not strictly requiring cross-site access
  }
}));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Label Manager Server!');
});

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//HTTPS CONFIGURATION:
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
