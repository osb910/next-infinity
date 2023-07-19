import {NextRequest, NextResponse} from 'next/server';
import Project from '@/app/mini-apps/next-projects/Project.model';
// import {limiter} from '../config/limiter';

export const GET = async (req: NextRequest) => {
  try {
    // const remaining = await limiter.removeTokens(1);
    // const origin = req.headers.get('origin');
    // console.log({origin});
    // console.log({remaining});
    // if (remaining < 0) {
    //   return NextResponse.json(
    //     {error: 'Too many requests'},
    //     {
    //       status: 429,
    //       statusText: 'Too Many Requests',
    //       headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'text/plain',
    //       },
    //     }
    //   );
    // }
    const res = await Project.find();
    if (!res) throw new Error('Projects not found');
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json({error: err.message}, {status: 404});
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {title, description, people} = await req.json();
    console.log(title, description, people);
    const project = new Project({
      title,
      description,
      people,
    });
    const res = await project.save();
    return NextResponse.json(
      {
        // @ts-ignore
        ...res._doc,
        status: 'success',
        message: `${res.title} has been added to the projects.`,
      },
      {status: 201}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    if (err.message.includes('duplicate key error')) {
      return NextResponse.json(
        {
          status: 'notice',
          // @ts-ignore
          message: `${err.keyValue.title} already exists as a project.`,
        },
        {status: 409}
      );
    }
    return NextResponse.json(
      {status: 'error', message: 'Inserting data failed.'},
      {status: 500}
    );
  }
};
