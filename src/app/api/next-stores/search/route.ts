import Store from '@/services/next-stores/store/store.model';
import {NextRequest, NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async ({nextUrl: {searchParams}}: NextRequest) => {
  try {
    const q = searchParams.get('q');
    const caseSensitive = searchParams.get('case-sensitive');
    if (!q) {
      return NextResponse.json(
        {
          stores: [],
          status: 'notice',
          message: 'No stores found!',
        },
        {status: 404, headers: {'Content-Type': 'application/json'}}
      );
    }
    const stores = await Store
      // find all stores that match
      .find(
        {
          $text: {$search: q, $caseSensitive: caseSensitive === 'true'},
        },
        {score: {$meta: 'textScore'}}
      )
      // sort by score
      .sort({score: {$meta: 'textScore'}})
      // limit to 5 results
      .limit(5);
    if (!stores) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    if (!stores.length) {
      return NextResponse.json(
        {
          stores,
          status: 'notice',
          message: `No stores found for ${q}!`,
        },
        {status: 404, headers: {'Content-Type': 'application/json'}}
      );
    }
    return NextResponse.json(
      {
        stores,
        status: 'success',
        message: `Successfully fetched stores!`,
      },
      {status: 200, headers: {'Content-Type': 'application/json'}}
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
