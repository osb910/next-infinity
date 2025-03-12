'use client';

import {useRef, useState} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Input, {type InputComponent} from '@/ui/Input';
import cls from './FilePicker.module.css';

// Better type definitions
export type FileData = {
  name: string;
  type: string;
  data: string | ArrayBuffer | null;
};

export interface FilePickerProps extends InputComponent {
  ctaText?: string;
  noPreviewText?: string;
  overwrite?: boolean;
  onFilesChange?: (files: FileData[]) => void;
}

// Component improvements
const FilePicker = ({
  ctaText = 'Pick a File',
  noPreviewText = 'No files picked yet',
  overwrite = true,
  onFilesChange,
  ...rest
}: FilePickerProps) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const [pickedFiles, setPickedFiles] = useState<Array<FileData>>([]);

  const pick = () => {
    filePicker.current?.click();
  };

  const changeFiles = (target: HTMLInputElement) => {
    const files = Array.from(target.files || []);

    if (!files.length) {
      setPickedFiles([]);
      onFilesChange?.([]);
      return;
    }

    const newFiles: Array<FileData> = [];

    const processFile = (file: File) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          const fileData: FileData = {
            name: file.name,
            type: file.type,
            data: reader.result,
          };

          newFiles.push(fileData);
          if (newFiles.length === files.length) {
            const updatedFiles = overwrite
              ? newFiles
              : [...pickedFiles, ...newFiles];
            setPickedFiles(updatedFiles);
            onFilesChange?.(updatedFiles);
          }
        }
      };

      reader.readAsDataURL(file);
    };

    files.forEach(processFile);
  };

  const renderPreview = (file: FileData) =>
    file.type.startsWith('image') ? (
      <Image
        key={file.name}
        src={file.data as string}
        fill
        alt={file.name}
        sizes='100vw'
      />
    ) : (
      <p key={file.name}>{file.name}</p>
    );

  return (
    <div className={cls.container}>
      <Input
        {...rest}
        type='file'
        ref={filePicker}
        setInput={changeFiles}
        className={clsx(cls.input, rest.className)}
        ctrlClass={clsx(cls.picker, rest.ctrlClass)}
      >
        <button
          type='button'
          className={cls.btn}
          onClick={pick}
        >
          {ctaText}
        </button>
      </Input>
      <section className={cls.preview}>
        {pickedFiles.length ? (
          pickedFiles.map(renderPreview)
        ) : (
          <p>{noPreviewText}</p>
        )}
      </section>
    </div>
  );
};

export default FilePicker;
