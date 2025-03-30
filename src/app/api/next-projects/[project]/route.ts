import {NextResponse} from 'next/server';
import Project from '@/app/mini-apps/next-projects/Project.model';
import {AppRoute} from '@/types';

export const PUT: AppRoute<{project: string}> = async (req, {params}) => {
  try {
    const {project} = await params;
    const body = await req.json();
    const {title, description, people} = body;
    if (title && title.length < 3) {
      return NextResponse.json(
        {
          status: 'warning',
          message: `Title must be at least 3 characters.`,
        },
        {status: 422}
      );
    }
    if (description && description.length < 10) {
      return NextResponse.json(
        {
          status: 'warning',
          message: `Description must be at least 10 characters.`,
        },
        {status: 422}
      );
    }
    if (people && (people < 1 || people > 6)) {
      return NextResponse.json(
        {
          status: 'warning',
          message: `People must be between 1 and 6.`,
        },
        {status: 422}
      );
    }

    const res = await Project.findByIdAndUpdate(project, body, {
      new: true,
    });
    if (!res) throw new Error('Project not found');
    return NextResponse.json(
      {
        status: 'success',
        message: `${res.title} has been updated.`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    // @ts-expect-error mongo error
    if (err.codeName === 'DuplicateKey') {
      return NextResponse.json(
        {
          status: 'notice',
          message: `${
            // @ts-expect-error mongo error
            err.keyValue[Object.keys(err.keyPattern)[0]]
          } already exists as a project.`,
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

export const DELETE: AppRoute<{project: string}> = async (_, {params}) => {
  try {
    const {project} = await params;
    const res = await Project.findByIdAndDelete(project);
    if (!res) throw new Error('Project not found');
    return NextResponse.json(
      {
        status: 'success',
        message: `${res.title} has been deleted.`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    return NextResponse.json(
      {status: 'error', message: 'Deleting data failed.'},
      {status: 500}
    );
  }
};
