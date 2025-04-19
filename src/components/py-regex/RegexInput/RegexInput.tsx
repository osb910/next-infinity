import {type ChangeEvent} from 'react';
import cls from './RegexInput.module.css';
import clsx from 'clsx';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface RegexInputProps {
  value: string;
  onChange: (value: string) => void;
  flags: string[];
  onFlagsChange: (flags: string[]) => void;
  isValid: boolean;
}

const flagsMap = [
  {
    value: 'v',
    label: 'Version1',
  },
  {
    value: 'i',
    label: 'Case insensitive',
  },
];

const RegexInput = ({
  value,
  onChange,
  flags,
  onFlagsChange,
  isValid,
}: RegexInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFlagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFlagsChange(e.target.value);
  };

  const changeFlags = (data) => {
    console.log({data});
  };

  return (
    <div className={cls.container}>
      <label
        htmlFor='regex-input'
        className={cls.label}
      >
        Regular Expression
      </label>
      <div className={cls.inputWrapper}>
        <span className={clsx(cls.delimiter, 'no-interaction')}>/</span>
        <input
          id='regex-input'
          type='text'
          value={value}
          onChange={handleChange}
          className={`${cls.input} ${!isValid ? cls.invalid : ''}`}
          placeholder='Enter your regex pattern'
        />
        <span className={clsx(cls.delimiter, 'no-interaction')}>/</span>
        <Select
          // inputId={appliedId}
          name='flags'
          defaultValue={[flagsMap[0]]}
          inputValue={value}
          isMulti
          options={flagsMap}
          // onInputChange={handleFlagsChange}
          onChange={changeFlags}
          components={animatedComponents}
          className='basic-multi-select'
          classNamePrefix='select'
          closeMenuOnSelect={false}
          isClearable
          isSearchable
          noOptionsMessage='All flags used'
          placeholder='Flags'
          hideSelectedOptions={false}
        />
        <input
          type='text'
          value={flags}
          onChange={handleFlagsChange}
          className={cls.flagsInput}
          placeholder='g'
        />
      </div>
      {!isValid && <p className={cls.errorText}>Invalid regular expression</p>}
    </div>
  );
};

export default RegexInput;
