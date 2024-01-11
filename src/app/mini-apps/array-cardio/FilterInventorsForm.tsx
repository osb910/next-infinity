'use client';
import {useState, useMemo, SetStateAction} from 'react';
import QuestionForm from './QuestionForm';
import Modal from '@/components/Modal';
import Portal from '@/ui/Portal';

interface FilterInventorsFormProps {
  setData: SetStateAction<any>;
}

const FilterInventorsForm = ({setData}: FilterInventorsFormProps) => {
  const [rawDataVisible, setRawDataVisible] = useState<boolean>(false);
  const showRawData = () => setRawDataVisible(true);
  const hideRawData = () => setRawDataVisible(false);
  const inventors = useMemo<any[]>(
    () => [
      {first: 'Albert', last: 'Einstein', year: 1879, passed: 1955},
      {first: 'Isaac', last: 'Newton', year: 1643, passed: 1727},
      {first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642},
      {first: 'Marie', last: 'Curie', year: 1867, passed: 1934},
      {first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630},
      {first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543},
      {first: 'Max', last: 'Planck', year: 1858, passed: 1947},
      {first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979},
      {first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852},
      {first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905},
      {first: 'Lise', last: 'Meitner', year: 1878, passed: 1968},
      {first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909},
    ],
    []
  );
  const filterInventors = (data: any) => {
    const {life, century, sort, order} = data;
    let filtered = inventors;
    if (century !== 'any') {
      const startYear = +century * 100 - 99;
      const endYear = +century * 100;
      filtered = inventors.filter(
        inventor => inventor[life] >= startYear && inventor[life] <= endYear
      );
    }
    if (sort === 'age') {
      filtered = filtered.sort((a, b) =>
        order === 'asc'
          ? a.passed - a.year - (b.passed - b.year)
          : b.passed - b.year - (a.passed - a.year)
      );
      setData(
        filtered.map(
          i => `${i.first} ${i.last} lived ${i.passed - i.year} years`
        )
      );
      return;
    }
    if (sort !== 'first' && sort !== 'last') {
      filtered = filtered.sort((a, b) =>
        order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
      );
    }
    if (sort === 'first' || sort === 'last') {
      filtered = filtered.sort((a, b) =>
        order === 'asc'
          ? a[sort].localeCompare(b[sort])
          : b[sort].localeCompare(a[sort])
      );
    }
    setData(filtered.map(i => `${i.first} ${i.last} in ${i[life]}`));
  };

  const getInventorsAges = () => {
    const ages = inventors.reduce(
      (acc, {year, passed}) => (acc += passed - year),
      0
    );
    setData([`All inventors lived a total of ${ages} years.`]);
  };
  return (
    <>
      <QuestionForm process={filterInventors}>
        <p>Which</p>
        <button type='button' onClick={showRawData}>
          inventors
        </button>
        <select id='life' name='life'>
          <option value='year'>were born</option>
          <option value='passed'>passed away</option>
        </select>
        <p>in</p>
        <select id='century' name='century'>
          <option value='any'>any</option>
          <option value='16'>the 16&apos;th</option>
          <option value='17'>the 17&apos;th</option>
          <option value='18'>the 18&apos;th</option>
          <option value='19'>the 19&apos;th</option>
          <option value='20'>the 20&apos;th</option>
        </select>
        <p>century, sorted by</p>
        <select id='sort' name='sort'>
          <option value='first'>first name</option>
          <option value='last'>last name</option>
          <option value='year'>birth year</option>
          <option value='passed'>passing year</option>
          <option value='age'>age</option>
        </select>{' '}
        <select id='order' name='order'>
          <option value='asc'>ascendingly</option>
          <option value='desc'>descendingly</option>
        </select>
      </QuestionForm>
      <QuestionForm process={getInventorsAges}>
        <p>How many years did all the</p>
        <button type='button' onClick={showRawData}>
          inventors
        </button>
        <p>live all together</p>
      </QuestionForm>
      {rawDataVisible && (
        <Portal>
          <Modal dismiss={hideRawData} title='Inventors' dismissText='Dismiss'>
            <ul>
              {inventors.map(i => (
                <li
                  key={i.first}
                >{`${i.first} ${i.last}, ${i.year} — ${i.passed}`}</li>
              ))}
            </ul>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default FilterInventorsForm;
