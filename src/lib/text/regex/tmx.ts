/**
 * .tmx Filetype Regular Expressions
 */

export const TMX_REGEX = Object.freeze({
  tu: /<tu[^]+?<\/tu>/g,
  seg: /<tuv.*?lang="([^"]+)"[^]+?<seg>([^]*?)<\/seg>[^]+?<\/tuv>/g,
  arSeg: /<tuv.*?lang="ar[^]+?<seg>([^]+?)<\/seg>[^]+?<\/tuv>/g,
  enSeg: /<tuv.*?lang="en[^]+?<seg>([^]+?)<\/seg>[^]+?<\/tuv>/g,
});
