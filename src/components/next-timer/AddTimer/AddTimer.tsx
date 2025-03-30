'use client';

import {useRef} from 'react';

// import Button from '@/ui/Button';
import Form, {type FormHandle} from '@/ui/Form';
import Input from '@/ui/Input';
import useTimers from '@/store/next-timer/useTimers';

export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const {addTimer} = useTimers();

  const saveTimer = async (data: Record<string, FormDataEntryValue | null>) => {
    const extractedData = data as {name: string; duration: string};
    addTimer({
      name: extractedData.name,
      duration: +extractedData.duration,
      status: 'stopped',
    });
    console.log(extractedData);
    form.current?.clear();
  };

  return (
    <Form
      submitText='Add Timer'
      ref={form}
      onSave={saveTimer}
      id='add-timer'
    >
      <Input
        label='Name'
        name='name'
      />
      <Input
        type='number'
        label='Duration'
        name='duration'
      />
    </Form>
  );
}
