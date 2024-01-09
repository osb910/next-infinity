import {type NextRequest, NextResponse} from 'next/server';
import Store, {
  getStore,
  updateStore,
  type IStore,
} from '@/services/next-stores/store';
import {getModelQuery} from '@/services/services.lib';

export type Params = {
  params: {
    storeParam: string;
  };
};

export const GET = async (req: NextRequest, {params: {storeParam}}: Params) => {
  try {
    const json = await getStore(storeParam);
    return NextResponse.json(json, {status: json.code});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};

export const PUT = async (req: NextRequest, {params: {storeParam}}: Params) => {
  try {
    const json = await updateStore(req, storeParam);
    return NextResponse.json(json, {status: json.code});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  {params: {storeParam}}: Params
) => {
  const userId = req.headers.get('X-USER-ID');
  const storeQuery = getModelQuery(storeParam);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore;
    if (store.author.toString() !== userId) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'You are not the author of this store!',
          code: 401,
        },
        {status: 401}
      );
    }
    const res = (await Store.findOneAndDelete(storeQuery)) as IStore;
    if (!res) {
      return NextResponse.json(
        {status: 'error', message: 'Something went wrong!', code: 500},
        {status: 500}
      );
    }
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        data: res,
        message: `Successfully deleted ${res.name}!`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};
