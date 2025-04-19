'use client';

import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState, type FocusEvent, type MouseEvent} from 'react';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import {motion} from 'framer-motion';
import {Globe, ChevronDown, Check} from 'react-feather';
import {type Locale} from '@/l10n';
import useToggle from '@/hooks/useToggle';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import Spinner from '@/ui/Spinner';
import cls from './Localizer.module.css';
import type {CSSProps, Lang} from '@/types';
import {TIME} from '@/utils/constants';
import Portal from '../Portal';
import usePosition from '@/hooks/usePosition';

export type LocalizerProps = Partial<IconButtonProps> & {
  langs: Array<Lang>;
  locale: Locale;
  displayLang?: boolean;
  method?: 'param' | 'cookie' | 'searchParam';
  useDefaultSearchParam?: boolean;
  defaultLocale?: Locale;
  radius?: string;
  bg?: string;
  bgMenu?: string;
  bgActive?: string;
  bgHover?: string;
};

const Localizer = ({
  langs,
  locale = 'en',
  displayLang,
  method = 'param',
  useDefaultSearchParam = false,
  defaultLocale = 'en',
  radius = '6px',
  bg = 'transparent',
  bgMenu = 'var(--gray-300)',
  bgActive = 'var(--gray-500)',
  bgHover = 'var(--gray-400)',
  ...rest
}: LocalizerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, toggleIsOpen] = useToggle();
  const [targetLocale, setTargetLocale] = useState<string>('');
  const language = langs.find((lang) => lang.code === locale);

  const [position, btnRef] = usePosition<HTMLButtonElement>([locale]);

  // close on click outside this component
  useEffect(() => {
    document.body.addEventListener('click', (evt) => {
      const localizer = (evt.target as HTMLBodyElement).closest(
        `.${cls.localizer}`
      );
      if (!localizer) toggleIsOpen(false);
    });
  }, [toggleIsOpen]);

  useEffect(() => {
    // properly set to closed and fix arrow
    toggleIsOpen(false);
    // remove loader
    setTargetLocale('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const changeLocale = (evt: MouseEvent<HTMLLIElement>): void => {
    evt.stopPropagation();
    const newLocale = (evt.target as HTMLLIElement).dataset.locale ?? '';
    setTargetLocale(newLocale);

    if (method === 'param') {
      const target = pathname.replace(
        /^\/[a-z]{2}(?:-[A-Z]{2})?/,
        `/${newLocale}`
      );
      router.replace(target);
    }

    if (method === 'cookie') {
      Cookies.set('locale', newLocale, {
        expires: 1000,
      });
      router.refresh();
    }

    if (method === 'searchParam') {
      const current = searchParams.get('locale');
      const allSP = searchParams.toString();
      const modSearchParams = allSP.replace(RegExp(`locale=${current}`), '');
      const localeSP =
        useDefaultSearchParam && newLocale === defaultLocale
          ? ''
          : `locale=${newLocale}`;
      const newSP = modSearchParams + localeSP;
      const target = `${pathname}${newSP ? `?${newSP}` : ''}`;
      router.push(target);
    }
  };

  const prefetch = (locale: Locale) => {
    const exists = langs.some((lang) => lang.code === locale);
    if (!exists || method !== 'param') return;
    setTimeout(() => {
      const target = pathname.replace(
        /^\/[a-z]{2}(?:-[A-Z]{2})?/,
        `/${locale}`
      );
      router.prefetch(target);
    }, TIME.GOLDEN_SEC / 4);
  };

  const onMouseEnter = async (evt: MouseEvent<HTMLLIElement>) => {
    const locale = (evt.target as HTMLLIElement).dataset.locale;
    prefetch(locale as Locale);
  };

  const onFocus = async (evt: FocusEvent<HTMLLIElement>) => {
    const locale = (evt.target as HTMLLIElement).dataset.locale;
    prefetch(locale as Locale);
  };

  const style: CSSProps = {
    '--border-radius': radius,
    '--bg': bg,
    '--bg-menu': bgMenu,
    '--bg-active': bgActive,
    '--bg-hover': bgHover,
  };

  const insetBlockStart = `calc(${position.top + position.height}px + 1em)`;
  const insetInlineStart = `calc(${position.left}px - ${position.width}px / 2 - 4px)`;

  return (
    <>
      <IconButton
        icon={
          <figure className={cls.icons}>
            <Globe />
            <ChevronDown className={clsx(cls.chevron, isOpen && cls.up)} />
          </figure>
        }
        {...rest}
        ref={btnRef}
        className={clsx(cls.localizer, rest.className)}
        style={{...style, ...rest.style}}
        highlightDeps={[locale]}
        onClick={() => toggleIsOpen()}
      >
        {displayLang && (
          <p className={clsx(cls.currentLang, 'current-lang')}>
            {language?.name}
          </p>
        )}
      </IconButton>
      <Portal style='z-index: 3;'>
        <motion.ul
          className={clsx(cls.langs)}
          style={{color: rest.style?.color, ...style}}
          animate={
            isOpen
              ? {
                  height: 'auto',
                  borderWidth: '2px',
                  filter: 'blur(0px)',
                  insetBlockStart,
                  insetInlineStart,
                  overflowY: 'auto',
                }
              : {
                  height: '0px',
                  borderWidth: '0px',
                  filter: 'blur(2px)',
                  insetBlockStart,
                  insetInlineStart,
                  overflowY: 'hidden',
                }
          }
          transition={{type: 'spring', damping: 20, stiffness: 450}}
        >
          {langs.map(({name, code, dir}, idx) => (
            <li
              key={`${code}-${idx}`}
              className={clsx(
                cls.lang,
                cls[dir],
                code === language?.code && cls.active
              )}
              data-locale={code}
              onClick={changeLocale}
              onMouseEnter={onMouseEnter}
              onFocus={onFocus}
              dir='auto'
            >
              <p>{name}</p>
              {targetLocale === code && <Spinner color='currentColor' />}
              {code === language?.code && <Check />}
            </li>
          ))}
        </motion.ul>
      </Portal>
    </>
  );
};

export default Localizer;
