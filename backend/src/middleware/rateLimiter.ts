import rateLimit from 'express-rate-limit';
import { config } from '../config';

export const contactLimiter = rateLimit({
  windowMs:        config.rateLimit.windowMs, // 15-min window
  max:             config.rateLimit.max,       // max submissions per IP per window
  standardHeaders: 'draft-7',                 // RateLimit-* headers (RFC 9110)
  legacyHeaders:   false,
  skipSuccessfulRequests: false,
  keyGenerator:    (req) => req.ip ?? 'unknown',
  message: {
    success: false,
    error:   'Too many submissions from this IP — please try again later.',
  },
  handler(req, res, _next, options) {
    res.status(options.statusCode).json(options.message);
  },
});
