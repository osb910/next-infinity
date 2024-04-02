'use client';

import Form, {Submit} from '@/ui/Form';
import cls from './ActionPanel.module.css';
import Input from '@/ui/Input';
import Icon from '@/ui/Icon';
import {useState} from 'react';
import clsx from 'clsx';

interface ActionPanelProps {
  tickers: Array<string>;
  addTicker: (ticker: string) => void;
  getReport: () => void;
}

const ActionPanel = ({tickers, addTicker, getReport}: ActionPanelProps) => {
  const [isTickerValid, setIsTickerValid] = useState(true);
  const saveTicker = async ({ticker}: {ticker?: string}) => {
    if (!ticker || ticker.length < 3) {
      setIsTickerValid(false);
    } else {
      setIsTickerValid(true);
      addTicker(ticker?.toUpperCase?.() ?? '');
    }
  };

  return (
    <section className={cls.actionPanel}>
      <Form
        className={cls.tickerInputForm}
        id='ticker-input-form'
        useSubmitBtn={false}
        onSave={saveTicker}
      >
        <Input
          id='ticker-input'
          name='ticker'
          placeholder='MSFT'
          label={
            isTickerValid
              ? 'Add up to 3 stock tickers below to get a super accurate stock predictions report👇'
              : 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
          }
          ctrlClass={clsx(
            cls.tickerInputCtrl,
            !isTickerValid && cls.invalidTicker
          )}
          className={cls.tickerInput}
        >
          <Submit className={cls.addTickerBtn} type='submit'>
            <Icon name='plus' />
          </Submit>
        </Input>
      </Form>
      <p className={cls.tickerChoices}>
        {tickers.length
          ? tickers.map(t => (
              <span key={t} className={cls.ticker}>
                {t}
              </span>
            ))
          : 'Your tickers will appear here...'}
      </p>
      <Form
        btnDisabled={tickers.length === 0}
        action={getReport}
        useSubmitBtn={false}
      >
        <Submit className={cls.generateReportBtn}>Generate Report</Submit>
      </Form>
      <p className={cls.tagLine}>Always correct 15% of the time!</p>
    </section>
  );
};

export default ActionPanel;
