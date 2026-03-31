import { validationResult, type ValidationChain } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

/**
 * Run an array of express-validator chains, then short-circuit with 422 if
 * any field fails. Usage:
 *
 *   router.post('/', validate([body('email').isEmail()]), handler);
 */
export function validate(chains: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all chains in parallel
    await Promise.all(chains.map((chain) => chain.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    res.status(422).json({
      success: false,
      error: 'Validation failed',
      fields: errors.array().map((e) => ({
        field:   (e as { path: string }).path,
        message: e.msg,
      })),
    });
  };
}
