import type { Request, Response, NextFunction } from 'express';
import {
  sendInternalNotification,
  sendAutoReply,
  type ContactPayload,
} from '../services/emailService';
import { config } from '../config';

export async function submitContact(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload: ContactPayload = {
      name:    req.body.name    as string,
      email:   req.body.email   as string,
      service: req.body.service as string,
      message: req.body.message as string,
      company: req.body.company as string | undefined,
      budget:  req.body.budget  as string | undefined,
    };

    // Fire both emails concurrently.
    // If the auto-reply fails we still confirm receipt — non-fatal.
    const [internalResult, autoReplyResult] = await Promise.allSettled([
      sendInternalNotification(payload),
      sendAutoReply(payload),
    ]);

    if (internalResult.status === 'rejected') {
      // Internal email is critical — surface the error so we know about it
      throw internalResult.reason;
    }

    if (autoReplyResult.status === 'rejected' && config.isDev) {
      // Log in dev, swallow in prod so the user still gets a success response
      console.warn('[contact] auto-reply failed:', autoReplyResult.reason);
    }

    res.status(200).json({
      success: true,
      message: "Message received — we'll be in touch within 1–2 business days.",
    });
  } catch (err) {
    next(err);
  }
}
