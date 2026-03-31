import type { CorsOptions } from 'cors';
import { config } from '../config';

const allowedOrigins = [config.frontendUrl, 'https://trime.agency'];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow server-to-server requests (no origin) or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods:     ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge:      86_400, // cache preflight for 24 h
};
