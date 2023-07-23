import Store, {IStore} from '@/entities/next-stores/store/store.model';
import {NextRequest, NextResponse} from 'next/server';

export const GET = async (
  req: NextRequest,
  {params}: {params: {slug: string}}
) => {
  const {slug} = params;
  try {
    const store = (await Store.findOne({slug})) as IStore & {
      _doc: IStore;
    };
    if (!store) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return NextResponse.json(
      {
        ...store._doc,
        status: 'success',
        message: `Successfully fetched ${store.name}!`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
