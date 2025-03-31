import {ChangeEvent} from 'react';
import cls from './TestStringInput.module.css';

interface Match {
  match: string;
  start: number;
  end: number;
}

interface TestStringInputProps {
  value: string;
  onChange: (value: string) => void;
  matches: Match[];
  isLoading: boolean;
}

const TestStringInput = ({
  value,
  onChange,
  matches,
  isLoading,
}: TestStringInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const renderHighlightedText = () => {
    if (matches.length === 0 || value === '') {
      return <span>{value}</span>;
    }

    const segments = [];
    let lastIndex = 0;

    // Sort matches by their start position
    const sortedMatches = [...matches].sort((a, b) => a.start - b.start);

    for (const match of sortedMatches) {
      // Add text before match
      if (match.start > lastIndex) {
        segments.push(
          <span key={`text-${lastIndex}`}>
            {value.substring(lastIndex, match.start)}
          </span>
        );
      }

      // Add highlighted match
      segments.push(
        <span
          key={`match-${match.start}`}
          className={cls.highlight}
        >
          {value.substring(match.start, match.end)}
        </span>
      );

      lastIndex = match.end;
    }

    // Add remaining text
    if (lastIndex < value.length) {
      segments.push(
        <span key={`text-${lastIndex}`}>{value.substring(lastIndex)}</span>
      );
    }

    return segments;
  };

  return (
    <div className={cls.container}>
      <label
        htmlFor='test-string'
        className={cls.label}
      >
        Test String
      </label>
      <textarea
        id='test-string'
        value={value}
        onChange={handleChange}
        className={cls.textarea}
        placeholder='Enter text to test against your regex'
      />

      {value && (
        <div className={`${cls.preview} ${isLoading ? cls.loading : ''}`}>
          <p className={cls.previewTitle}>Preview with Matches:</p>
          <div className={cls.previewContent}>{renderHighlightedText()}</div>
        </div>
      )}
    </div>
  );
};

export default TestStringInput;
