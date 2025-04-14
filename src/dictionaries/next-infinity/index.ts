import type {Locale} from '@/l10n/l10n.types';
import site from './site';

export const nextInfinity = (
  locale: Locale,
  options?: Record<string, any>
) => ({
  site: site(locale, options),
});
