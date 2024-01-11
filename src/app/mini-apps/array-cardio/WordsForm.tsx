'use client';
import {useState, useMemo, SetStateAction} from 'react';
import QuestionForm from './QuestionForm';
import Modal from '@/components/Modal';
import Portal from '@/ui/Portal';

interface WordsFormProps {
  setData: SetStateAction<any>;
}

const WordsForm = ({setData}: WordsFormProps) => {
  const [rawDataVisible, setRawDataVisible] = useState<boolean>(false);
  const showRawData = () => setRawDataVisible(true);
  const hideRawData = () => setRawDataVisible(false);
  const data = useMemo(
    () => [
      'car',
      'car',
      'truck',
      'truck',
      'bike',
      'walk',
      'car',
      'van',
      'bike',
      'walk',
      'car',
      'van',
      'car',
      'truck',
    ],
    []
  );

  const sum = () => {
    const instances = [...new Set(data)];
    setData([`${instances.length} instances`, instances.join(', ')]);
  };
  return (
    <QuestionForm process={sum}>
      <p>Sum up the instances of each of</p>
      <button type='button' onClick={() => showRawData()}>
        these
      </button>
      {rawDataVisible && (
        <Portal>
          <Modal dismiss={hideRawData} title='Words' dismissText='Dismiss'>
            <p>{data.join(', ')}</p>
          </Modal>
        </Portal>
      )}
    </QuestionForm>
  );
};

export default WordsForm;
