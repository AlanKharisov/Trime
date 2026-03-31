import { Router } from 'express';
import { body } from 'express-validator';
import { submitContact } from '../controllers/contactController';
import { contactLimiter } from '../middleware/rateLimiter';
import { validate }       from '../middleware/validateRequest';

const router = Router();

// ─── Validation rules ────────────────────────────────────────────────────────
const contactRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('service')
    .trim()
    .notEmpty().withMessage('Please select a service.')
    .isIn(['fullstack', 'design', 'seo', 'brand', 'other'])
    .withMessage('Invalid service selected.')
    .escape(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters.')
    .escape(),

  // Optional fields
  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('Company name must be under 100 characters.')
    .escape(),

  body('budget')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['under-5k', '5k-15k', '15k-50k', '50k+', ''])
    .withMessage('Invalid budget range.'),
];

// POST /api/contact
router.post('/', contactLimiter, validate(contactRules), submitContact);

export default router;
