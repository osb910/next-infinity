'use client';

import {useState} from 'react';
// import {copy} from '@/utils/text/clipboard';

type CopiedValue = string | null;
type CopyFn = (text: string | Array<string>) => Promise<boolean>; // Return success
type PasteFn = () => Promise<string>;

export type ClipboardReturn = {
  copied: CopiedValue;
  copy: CopyFn;
  paste: PasteFn;
};

/**
 * Custom hook to interact with the clipboard
 * @returns Object containing copy and paste functions
 */
const useClipboard = (): ClipboardReturn => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copyToClipboard: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    const cleanText = Array.isArray(text)
      ? text.map((el) => el.trim()).join('\n')
      : text.trim();

    try {
      await navigator.clipboard.writeText(cleanText);
      setCopiedText(cleanText);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  const pasteFromClipboard = async () => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return '';
    }

    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      console.warn('Paste failed', error);
      return '';
    }
  };

  return {copy: copyToClipboard, copied: copiedText, paste: pasteFromClipboard};
};

export default useClipboard;
