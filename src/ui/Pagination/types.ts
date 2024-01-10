import {ComponentProps} from 'react';

export interface P8nProps extends ComponentProps<'ul'> {
  page: number;
  pages: number;
  rtl?: boolean;
  buttonText?: string;
}
