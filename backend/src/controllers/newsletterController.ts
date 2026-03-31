import type { Request, Response, NextFunction } from 'express';

export async function subscribeNewsletter(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    // TODO: integrate with Mailchimp / ConvertKit / Resend
    console.log('[newsletter] new subscriber:', email);

    res.status(200).json({ success: true, message: 'Subscribed successfully.' });
  } catch (err) {
    next(err);
  }
}
