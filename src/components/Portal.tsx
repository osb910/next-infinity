'use client';
import {useState, useEffect, useId, ReactNode} from 'react';
import {createPortal} from 'react-dom';

const Portal = ({lang, children}: {lang?: string; children: ReactNode}) => {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const id = useId();

  useEffect(() => {
    const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    const portal = new DOMParser().parseFromString(
      `
      <div data-portal${id} dir=${dir} class='${dir}'></div>
    `,
      'text/html'
    ).body.firstChild as HTMLElement;
    document.body.append(portal);
    setHost(portal);

    return () => portal.remove();
  }, [id, lang]);

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
