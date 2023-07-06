import {NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';
import mongoose from 'mongoose';
import {dbConnectNextEvents} from '@/app/next-events/database';

export const GET = async () => {
  try {
    const dbName = mongoose.connection?.db?.namespace;
    console.log({dbName});
    dbName !== 'next-events' && (await dbConnectNextEvents());
    // const isFeatured = req.nextUrl.searchParams.has('featured');
    // const filter = isFeatured ? {isFeatured: true} : {};
    const res = await Event.find();
    if (!res) throw new Error('Events not found');
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: (err as Error).message}, {status: 404});
  }
};
