'use client';

import {useRouter, usePathname} from 'next/navigation';
import {useEffect, useState, type FocusEvent, type MouseEvent} from 'react';
import clsx from 'clsx';
import {motion} from 'framer-motion';
import {Locale} from '@/l10n/next-blog/l10n.types';
import useToggle from '@/hooks/useToggle';
import {TIME} from '@/constants/numbers';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import Icon from '@/ui/Icon/iconify';
import Spinner from '@/ui/Spinner';
import cls from './Localizer.module.css';
import {CSSProps, Lang} from '@/types';

export type LocalizerProps = Partial<IconButtonProps> & {
  langs: Array<Omit<Lang, 'dictionary'>>;
  locale: Locale;
  displayLang?: boolean;
  radius?: string;
  bg?: string;
  bgMenu?: string;
  bgActive?: string;
};

const Localizer = ({
  langs,
  locale = 'en',
  displayLang,
  radius = '6px',
  bg = 'transparent',
  bgMenu = 'var(--gray-500)',
  bgActive = 'var(--gray-700)',
  ...rest
}: LocalizerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, toggleIsOpen] = useToggle();
  const [targetLocale, setTargetLocale] = useState<string>('');
  const language = langs.find((lang) => lang.code === locale);

  useEffect(() => {
    document.body.addEventListener('click', (evt) => {
      const localizer = (evt.target as HTMLBodyElement).closest(
        `.${cls.localizer}`
      );
      !localizer && toggleIsOpen(false);
    });
  }, [toggleIsOpen]);

  const changeLocale = (evt: MouseEvent<HTMLLIElement>): void => {
    evt.stopPropagation();
    const newLocale = (evt.target as HTMLLIElement).dataset.locale ?? '';
    setTargetLocale(newLocale);
    const target = pathname.replace(
      /^\/[a-z]{2}(?:-[A-Z]{2})?/,
      `/${newLocale}`
    );
    router.replace(target);
  };

  const prefetch = (locale: Locale) => {
    const exists = langs.some((lang) => lang.code === locale);
    if (!exists) return;
    setTimeout(() => {
      const target = pathname.replace(
        /^\/[a-z]{2}(?:-[A-Z]{2})?/,
        `/${locale}`
      );
      router.prefetch(target);
    }, TIME.goldenSec / 4);
  };

  const onMouseEnter = async (evt: MouseEvent<HTMLLIElement>) => {
    const locale = (evt.target as HTMLLIElement).dataset.locale;
    prefetch(locale as Locale);
  };

  const onFocus = async (evt: FocusEvent<HTMLLIElement>) => {
    const locale = (evt.target as HTMLLIElement).dataset.locale;
    prefetch(locale as Locale);
  };

  const height = `${langs.length * 100}% + ${langs.length * 2 + 1}px`;

  const style: CSSProps = {
    '--border-radius': radius,
    '--bg': bg,
    '--bg-menu': bgMenu,
    '--bg-active': bgActive,
  };

  return (
    <IconButton
      icon={
        <>
          <Icon icon='lucide:globe' />
          <Icon icon={`iconamoon:arrow-${isOpen ? 'up' : 'down'}-2-fill`} />
        </>
      }
      {...rest}
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
      <motion.ul
        className={clsx(cls.langs, isOpen && cls.open)}
        animate={
          isOpen
            ? {
                blockSize: `calc(${height})`,
                borderWidth: '2px',
                filter: 'blur(0px)',
              }
            : {
                blockSize: '0',
                borderWidth: '0',
                filter: 'blur(2px)',
              }
        }
        transition={{type: 'spring', damping: 18, stiffness: 450}}
      >
        {langs.map(({name, code, dir}) => (
          <li
            key={code}
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
            {code === language?.code && <Icon icon='lucide:check' />}
          </li>
        ))}
      </motion.ul>
    </IconButton>
  );
};

export default Localizer;
