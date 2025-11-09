import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import caseRoutes from './routes/cases.js';
import userRoutes from './routes/users.js';

const app = express();
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/cases', caseRoutes);
app.use('/api/users', userRoutes);

// Debug: list registered routes once at startup
function listRoutes() {
  const routes = [];
  app._router.stack.forEach(mw => {
    if (mw.route) {
      const methods = Object.keys(mw.route.methods).join(',').toUpperCase();
      routes.push(`${methods} ${mw.route.path}`);
    } else if (mw.name === 'router' && mw.handle?.stack) {
      mw.handle.stack.forEach(handler => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(',').toUpperCase();
          routes.push(`${methods} ${handler.route.path}`);
        }
      });
    }
  });
  console.log('Registered routes:\n' + routes.map(r => ' - ' + r).join('\n'));
}

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 }).then(() => {
  console.log('MongoDB connected');
  listRoutes();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Mongo connection error:', err?.message || err);
  process.exit(1);
});
