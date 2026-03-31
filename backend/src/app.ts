import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import { config }          from './config';
import { corsOptions }     from './middleware/cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import router from './routes';

const app = express();

// ─── Trust proxy (required for accurate req.ip behind Nginx / Render / Fly) ──
app.set('trust proxy', 1);

// ─── Security ────────────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false, // relax for API usage
}));
app.use(cors(corsOptions));

// ─── Performance ─────────────────────────────────────────────────────────────
app.use(compression());

// ─── Logging ─────────────────────────────────────────────────────────────────
app.use(morgan(config.isDev ? 'dev' : 'combined'));

// ─── Body parsing — hard cap at 10 KB to blunt payload-based DoS ─────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api', router);

// ─── Error handling (must be registered after all routes) ────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Boot ─────────────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`[server] http://localhost:${config.port}  (${config.nodeEnv})`);
});

export default app;
