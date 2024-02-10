'use client';
import {useState, useEffect, useId, ReactNode} from 'react';
import {createPortal} from 'react-dom';

export const Portal = ({
  lang,
  children,
  style,
}: {
  lang?: string;
  children: ReactNode;
  style?: string;
}) => {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const id = useId();

  useEffect(() => {
    const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    const portal = new DOMParser().parseFromString(
      `
      <div
        data-portal=${id} dir=${dir} class='${dir}'
        style='position: relative; ${style ?? 'z-index: 3;'}'
      >
      </div>
    `,
      'text/html'
    ).body.firstChild as HTMLElement;
    const firstPortal = document.querySelector(`[data-portal]`);
    const lastEl = document.querySelector(`body > :last-child`);
    firstPortal
      ? firstPortal.insertAdjacentElement('beforebegin', portal)
      : lastEl
      ? lastEl.insertAdjacentElement('afterend', portal)
      : document.body.append(portal);
    setHost(portal);

    return () => portal.remove();
  }, [id, lang, style]);

  return host ? createPortal(children, host) : null;
};

// Simple version
const Portal2 = ({children, lang}: {lang?: string; children: ReactNode}) => {
  const id = useId();
  const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
  return createPortal(
    <div data-portal={id} dir={dir} className={dir}>
      {children}
    </div>,
    document.body
  );
};

export default Portal;
