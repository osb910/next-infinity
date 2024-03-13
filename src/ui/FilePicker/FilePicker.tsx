'use client';

import {useRef, useState} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Input, {type InputProps, type InputComponent} from '@/ui/Input';
import cls from './FilePicker.module.css';

export interface FilePickerProps extends InputComponent {
  ctaText?: string;
  noPreviewText?: string;
  overwrite?: boolean;
}

const FilePicker = ({
  ctaText = 'Pick a File',
  noPreviewText = 'No files picked yet',
  overwrite = true,
  ...delegated
}: FilePickerProps) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const [pickedFiles, setPickedFiles] = useState<
    Array<{name: string; type: string; data: string | ArrayBuffer | null}>
  >([]);

  const pick = () => {
    filePicker.current?.click();
  };

  const changeFiles = (target: HTMLInputElement) => {
    const files = target.files;

    if (!files) {
      setPickedFiles([]);
      return;
    }

    if (overwrite) setPickedFiles([]);

    for (let file of files) {
      const fileReader = new FileReader();

      fileReader.onload = evt => {
        fileReader.result &&
          setPickedFiles(current => [
            ...current,
            {name: file.name, type: file.type, data: fileReader.result},
          ]);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className={cls.root}>
      <Input
        {...delegated}
        type='file'
        ref={filePicker}
        setInput={changeFiles}
        className={clsx(cls.input, delegated.className)}
        ctrlClass={clsx(cls.picker, delegated.ctrlClass)}
      >
        <button type='button' className={cls.btn} onClick={pick}>
          {ctaText}
        </button>
      </Input>
      <div className={cls.preview}>
        {!pickedFiles.length ? (
          <p>{noPreviewText}</p>
        ) : (
          pickedFiles.map(file =>
            file.type.startsWith('image') ? (
              <Image key={file.name} src={file.data as string} fill alt='' />
            ) : (
              <p key={file.name}>{file.name}</p>
            )
          )
        )}
      </div>
    </div>
  );
};

export default FilePicker;
