import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import {generateRss} from '@/lib/files/rss';
import {NextRequest, NextResponse} from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const blogPosts = await getBlogPostList();
    const feed = generateRss({
      title: 'Next Blog',
      description: 'Read about different topics',
      site: `https://next-infinity.vercel.app/next-blog`,
      items: blogPosts.map(p => ({
        title: p.title,
        description: p.abstract,
        date: p.publishedOn,
        slug: p.slug,
      })),
    });
    const response = new NextResponse(feed);
    response.headers.set('Content-Type', 'application/xml');
    return response;
  } catch (err) {
    if (!(err instanceof Error)) return;
  }
};
