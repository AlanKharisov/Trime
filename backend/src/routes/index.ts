import { Router } from 'express';
import contactRouter    from './contact';
import newsletterRouter from './newsletter';

const router = Router();

// Health-check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/contact',    contactRouter);
router.use('/newsletter', newsletterRouter);

export default router;
