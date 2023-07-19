import mammoth from 'mammoth';
import {JSDOM} from 'jsdom';

const stripHtml = (el: HTMLElement) =>
  el.innerHTML
    .replace(/<sup><a.+?<\/a><\/sup>/g, '')
    .replace(/(<\/p>)(<p>)/g, '$1\n$2')
    .replace(/<br ?\/?>/g, '\n')
    .replace(/<[^>]+>/g, '');

const getCellComments = (cell: any, comments: any) => {
  const cellCommentRefs = Array.from(cell.querySelectorAll('sup a'));
  const cellComments = cellCommentRefs.map(ref => {
    if (!ref?.id) return;
    const id = ref.id.replace('#', '');
    const comment = comments.find(comment =>
      comment.querySelector('a').href.match(new RegExp(`#${id}`))
    );
    return comment.textContent.replace(/\s\u2191$/, '');
  });
  return cellComments;
};

const parseTableData = (html: string) => {
  const dom = new JSDOM(html);
  const table = dom.window.document.querySelector('table');
  const comments = Array.from(dom.window.document.querySelectorAll('dl dd'));
  const rows = Array.from(table.querySelectorAll('tr'));
  const header = rows.shift();
  const [targetLang, sourceLang] = Array.from(header.querySelectorAll('td'));
  const grid = rows.map(segment => {
    const [translation, source] = Array.from(segment.querySelectorAll('td'));
    const translationComments = getCellComments(translation, comments);
    const sourceComments = getCellComments(source, comments);
    const translationText = stripHtml(translation);
    const sourceText = stripHtml(source);
    return {
      translation: {
        text: translationText,
        comments: translationComments,
      },
      arabic: {
        text: sourceText,
        comments: sourceComments,
      },
    };
  });
  return {
    grid,
    sourceLang: sourceLang.textContent.replace(/^[a-z]{2}/i, lang =>
      lang.toLowerCase()
    ),
    targetLang: targetLang.textContent.replace(/^[a-z]{2}/i, lang =>
      lang.toLowerCase()
    ),
  };
};

const parseDocxTm = async (
  docxPath: string
): {segments: any; targetLang: string; sourceLang: string} => {
  const options: {styleMap: string[]} = {
    styleMap: ['comment-reference => sup'],
  };
  const result = await mammoth.convertToHtml({path: docxPath}, options);
  const {grid: segments, targetLang, sourceLang} = parseTableData(result.value);
  return {segments, targetLang, sourceLang};
};

export {parseDocxTm, parseTableData};
