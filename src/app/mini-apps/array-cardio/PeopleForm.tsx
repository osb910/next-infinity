'use client';
import {useState, useMemo, SetStateAction} from 'react';
import QuestionForm from './QuestionForm';
import Modal from '@/components/Modal';
import Portal from '@/components/Portal';

interface PeopleFormProps {
  setData: SetStateAction<any>;
}

const PeopleForm = ({setData}: PeopleFormProps) => {
  const [rawDataVisible, setRawDataVisible] = useState<boolean>(false);
  const showRawData = () => setRawDataVisible(true);
  const hideRawData = () => setRawDataVisible(false);
  const people = useMemo<{first: string; last: string}[]>(
    () =>
      [
        'Bernhard, Sandra',
        'Bethea, Erin',
        'Becker, Carl',
        'Bentsen, Lloyd',
        'Beckett, Samuel',
        'Blake, William',
        'Berger, Ric',
        'Beddoes, Mick',
        'Beethoven, Ludwig',
        'Belloc, Hilaire',
        'Begin, Menachem',
        'Bellow, Saul',
        'Benchley, Robert',
        'Blair, Robert',
        'Benenson, Peter',
        'Benjamin, Walter',
        'Berlin, Irving',
        'Benn, Tony',
        'Benson, Leana',
        'Bent, Silas',
        'Berle, Milton',
        'Berry, Halle',
        'Biko, Steve',
        'Beck, Glenn',
        'Bergman, Ingmar',
        'Black, Elk',
        'Berio, Luciano',
        'Berne, Eric',
        'Berra, Yogi',
        'Berry, Wendell',
        'Bevan, Aneurin',
        'Ben-Gurion, David',
        'Bevel, Ken',
        'Biden, Joseph',
        'Bennington, Chester',
        'Bierce, Ambrose',
        'Billings, Josh',
        'Birrell, Augustine',
        'Blair, Tony',
        'Beecher, Henry',
        'Biondo, Frank',
      ].map(name => {
        const [last, first] = name.split(', ');
        return {last, first};
      }),
    []
  );

  const sortPeople = (data: any) => {
    const {sort, order} = data;
    const sorted = people.sort((a, b) => {
      if (sort === 'first') {
        return order === 'asc'
          ? a.first.localeCompare(b.first)
          : b.first.localeCompare(a.first);
      } else {
        return order === 'asc'
          ? a.last.localeCompare(b.last)
          : b.last.localeCompare(a.last);
      }
    });
    setData(sorted.map(({first, last}) => `${first} ${last}`));
  };

  return (
    <QuestionForm process={sortPeople}>
      <p>Sort the</p>
      <button type='button' onClick={() => showRawData()}>
        people
      </button>
      <select id='order' name='order'>
        <option value='asc'>ascendingly</option>
        <option value='desc'>descendingly</option>
      </select>
      <p>by</p>
      <select id='sort' name='sort'>
        <option value='first'>first name</option>
        <option value='last'>last name</option>
      </select>
      {rawDataVisible && (
        <Portal>
          <Modal dismiss={hideRawData} title='People' dismissText='Dismiss'>
            <ul>
              {people.map(p => (
                <li key={p.first}>{`${p.last}, ${p.first}`}</li>
              ))}
            </ul>
          </Modal>
        </Portal>
      )}
    </QuestionForm>
  );
};

export default PeopleForm;
