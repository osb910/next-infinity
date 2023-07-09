const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const getUrlPromise = async (url: string) => {
  const res = await fetch(url);
  const data = await res.text();
  return data;
};

const getHTML = (data: string) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'text/html');
  return dom;
};

const getHTMLPage = async (url: string) => {
  try {
    const data = await getUrlPromise(url); // PLAIN TEXT
    const dom = getHTML(data); // DOM TREE
    return dom;
  } catch (err) {
    console.error(err);
  }
};

export {delay, getUrlPromise, getHTML, getHTMLPage};
