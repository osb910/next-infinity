export interface FileObject {
  fieldName: string;
  originalName: string;
  originalTitle: string;
  type: string;
  ext: string;
  // encoding: string;
  mimetype: string;
  title: string;
  fileName: string;
  size: number;
  readableSize: string;
  buffer: Buffer;
  destination?: string;
  path?: string;
}

export type StorageAndDest =
  | {
      storage?: 'memory';
    }
  | {
      storage: 'disk';
      dest: string;
    };

export type ParserOptions = StorageAndDest & {field?: string; resize?: boolean};

export type FileParser = (
  file: File,
  options: ParserOptions
) => Promise<FileObject | void>;

export type NulterOptions = {
  field: string;
  resize?: boolean;
} & StorageAndDest;

export type Nulter = (
  body: FormData,
  options: NulterOptions
) => Promise<FileObject | FileObject[] | void>;
