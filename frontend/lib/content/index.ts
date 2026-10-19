import { en } from './en';
import { es } from './es';
import { ru } from './ru';
import { uk } from './uk';
import type { Content, Locale } from './types';

export { LOCALES } from './types';
export type { Content, Locale } from './types';

export const CONTENT: Record<Locale, Content> = { en, uk, ru, es };
