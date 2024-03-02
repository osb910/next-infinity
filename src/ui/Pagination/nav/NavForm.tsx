'use client';

import {useRouter} from 'next/navigation';
import Form from '@/ui/Form';
import Input from '@/ui/Input';
import styles from '../Pagination.module.css';

interface NavFormProps {
  pages: number;
  page: number;
  buttonText: string;
}

export const NavForm = ({pages, page, buttonText}: NavFormProps) => {
  const router = useRouter();
  const navigate = async (body: FormData) => {
    const dest = body.get('p');
    if (typeof dest !== 'string' || isNaN(+dest)) return;
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(
      'p',
      +dest < 1 ? '1' : +dest > pages ? `${pages}` : dest
    );
    router.push(newUrl.href);
  };
  return (
    <Form
      submitHandler={navigate}
      submitText={buttonText}
      className={styles.navForm}
    >
      <Input
        label='Page'
        type='number'
        max={pages}
        defaultValue={page}
        key={page}
      />
    </Form>
  );
};

export default NavForm;
