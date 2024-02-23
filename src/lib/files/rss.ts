import RSS from 'rss';

type FeedData = {
  title: string;
  description: string;
  site: string;
  items: Array<{
    title: string;
    description: string;
    date: string;
    slug?: string;
  }>;
};

export const generateRss = ({title, description, site, items}: FeedData) => {
  const feed = new RSS({
    title,
    description,
    site_url: site,
    feed_url: site,
  });

  items.forEach(item => {
    feed.item({
      title: item.title,
      description: item.description,
      date: item.date,
      url: `${site}/${item.slug ?? ''}`,
    });
  });

  return feed.xml({indent: true});
};
