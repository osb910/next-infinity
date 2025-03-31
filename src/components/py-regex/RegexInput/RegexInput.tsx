import {type ChangeEvent} from 'react';
import cls from './RegexInput.module.css';

interface RegexInputProps {
  value: string;
  onChange: (value: string) => void;
  flags: string[];
  onFlagsChange: (flags: string[]) => void;
  isValid: boolean;
}

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

  return (
    <div className={cls.container}>
      <label
        htmlFor='regex-input'
        className={cls.label}
      >
        Regular Expression
      </label>
      <div className={cls.inputWrapper}>
        <span className={cls.delimiter}>/</span>
        <input
          id='regex-input'
          type='text'
          value={value}
          onChange={handleChange}
          className={`${cls.input} ${!isValid ? cls.invalid : ''}`}
          placeholder='Enter your regex pattern'
        />
        <span className={cls.delimiter}>/</span>
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
