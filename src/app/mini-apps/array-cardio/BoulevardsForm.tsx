'use client';
import {useState, useEffect, useRef, SetStateAction} from 'react';
import useSWR from 'swr';
import {getHTMLPage} from '@/utils/promises';
import QuestionForm from './QuestionForm';
import Modal from '@/components/Modal';
import Portal from '@/ui/Portal';
import Spinner from '@/ui/Spinner/Spinner';

interface BoulevardsFormProps {
  setData: SetStateAction<any>;
}

const fetcher = async (url: string) => {
  const page = await getHTMLPage(url);
  const links = [...page!.querySelectorAll('.mw-category-group a')];
  return links;
};

const BoulevardsForm = ({setData}: BoulevardsFormProps) => {
  const [phrase, setPhrase] = useState<string>('de');
  const phraseRef = useRef<HTMLInputElement>(null);
  const [rawDataVisible, setRawDataVisible] = useState<boolean>(false);
  const showRawData = () => setRawDataVisible(true);
  const hideRawData = () => setRawDataVisible(false);
  const {
    data,
    // error,
    isLoading,
  } = useSWR(
    'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris',
    fetcher
  );
  useEffect(() => {
    if (isLoading) return;
    phraseRef.current!.size = phrase?.length || 1;
  }, [isLoading, phrase]);
  const getBoulevards = ({phrase}: {phrase: string}) => {
    const de = data!
      .map((link) => link.textContent)
      .filter((name) => name!.match(RegExp(`${phrase}`, 'i')));
    setData(de);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <QuestionForm process={getBoulevards}>
      <p>Which</p>
      <button
        type='button'
        onClick={showRawData}
      >
        boulevards
      </button>
      <p>in Paris contain the phrase</p>
      <input
        type='text'
        name='phrase'
        id='phrase'
        value={phrase}
        onInput={(evt) => {
          setPhrase((evt.target as HTMLInputElement).value);
        }}
        ref={phraseRef}
      />
      {rawDataVisible && (
        <Portal>
          <Modal
            dismiss={hideRawData}
            title='Inventors'
            dismissText='Dismiss'
          >
            <ul>
              {data!.map((a) => (
                <li key={a.textContent}>{a.textContent}</li>
              ))}
            </ul>
          </Modal>
        </Portal>
      )}
    </QuestionForm>
  );
};

export default BoulevardsForm;
