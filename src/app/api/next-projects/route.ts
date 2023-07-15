import {NextRequest, NextResponse} from 'next/server';
import Project from '@/app/mini-apps/next-projects/Project.model';

export const GET = async () => {
  try {
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
