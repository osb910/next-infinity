export const copy = (texts: Array<string>) => {
  const cleanText = texts.map((el) => el.trim());
  if (cleanText.length === 0) return;
  const copied = cleanText.join('\n');
  navigator.clipboard.writeText(copied);
  return copied;
};
