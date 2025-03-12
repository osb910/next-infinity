'use server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
export const navigate = async (pages: number, body: FormData) => {
  try {
    const dest = body.get('p');
    if (typeof dest !== 'string' || isNaN(+dest)) return;
    const newUrl = new URL((await headers()).get('referer') ?? '');
    newUrl.searchParams.set(
      'p',
      +dest < 1 ? '1' : +dest > pages ? `${pages}` : dest
    );
    redirect(newUrl.pathname + newUrl.search);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.log(err);
  }
};
