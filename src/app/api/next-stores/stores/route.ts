import {NextRequest, NextResponse} from 'next/server';
import Store, {
  createStore,
  deleteAllStores,
} from '@/services/next-stores/store';

export const GET = async ({nextUrl: {searchParams}}: NextRequest) => {
  const page = searchParams.get('p');
  const limit = searchParams.get('limit');
  const tag = searchParams.get('tag');
  try {
    const query = {
      tags: !tag || tag === 'undefined' ? {$exists: true} : tag,
    };
    const json = await Store.findWithReviews({
      page,
      limit,
      query,
    });
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

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get('X-USER-ID');
  if (!userId)
    return NextResponse.json(
      {status: 'error', message: 'You are not logged in!', code: 401},
      {status: 401}
    );
  try {
    const body = await req.formData();
    const json = await createStore(body, userId);

    return NextResponse.json(json, {status: json.code});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};

export const DELETE = async () => {
  try {
    const json = await deleteAllStores();
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
