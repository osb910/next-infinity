import {NextResponse} from 'next/server';
import Store, {
  getStore,
  updateStore,
  type IStore,
} from '@/services/next-stores/store';
import {getModelQuery} from '@/services/lib';
import type {AppRoute} from '@/types';
import {nextDBConnect} from '@/lib/db';

export type StoreRoute<T = Record<string, string>> = AppRoute<
  {
    storeParam: string;
  } & T
>;

export const GET: StoreRoute = async (_, {params}) => {
  try {
    await nextDBConnect();
    const {storeParam} = await params;
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

export const PUT: StoreRoute = async (req, {params}) => {
  try {
    const {storeParam} = await params;
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

export const DELETE: StoreRoute = async (req, {params}) => {
  const userId = req.headers.get('X-USER-ID');
  try {
    const {storeParam} = await params;
    const storeQuery = getModelQuery(storeParam);
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
