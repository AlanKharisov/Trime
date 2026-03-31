import { Router } from 'express';
import { subscribeNewsletter } from '../controllers/newsletterController';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

// POST /api/newsletter
router.post('/', contactLimiter, subscribeNewsletter);

export default router;
