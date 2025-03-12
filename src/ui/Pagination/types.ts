import {type ComponentPropsWithoutRef} from 'react';

export interface P8nProps extends ComponentPropsWithoutRef<'ul'> {
  page: number;
  pages: number;
  rtl?: boolean;
  buttonText?: string;
}
