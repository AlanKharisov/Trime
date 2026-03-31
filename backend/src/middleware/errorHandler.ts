import type { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error:   `Cannot ${req.method} ${req.path}`,
  });
}

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

export function errorHandler(
  err:  HttpError,
  _req: Request,
  res:  Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const status  = err.status ?? err.statusCode ?? 500;
  const message = config.isDev ? err.message : 'Internal server error';

  if (status >= 500) {
    // Log full stack in dev; structured message in prod (for log aggregators)
    console.error(config.isDev ? err : `[error] ${err.message}`);
  }

  res.status(status).json({ success: false, error: message });
}
