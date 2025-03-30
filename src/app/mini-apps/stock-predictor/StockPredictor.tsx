'use client';

import {useState} from 'react';
import cls from './StockPredictor.module.css';
import ActionPanel from '@/components/mini-apps/stock-predictor/ActionPanel';
import Spinner from '@/ui/Spinner';
import useArray from '@/hooks/useArray';
import {fetchReport, fetchStockData} from './actions';

const StockPredictor = () => {
  const {array: tickers, push} = useArray<string>([]);
  const [status, setStatus] = useState('idle');
  const [report, setReport] = useState('');
  const addTicker = (ticker?: string) => {
    push(ticker ?? '', {unique: true});
  };

  const getReport = async () => {
    setStatus('loading');
    try {
      const stockData = await fetchStockData(tickers);
      setStatus('generating');
      const report = await fetchReport(stockData ?? ['']);
      if (report?.status === 'success') {
        setReport(report.text);
      } else {
        throw new Error('There was an error in generating the report.');
      }
    } catch (err) {
      console.log(err);
    }
    setStatus('resolved');
  };
  return (
    <>
      <ActionPanel
        tickers={tickers}
        addTicker={addTicker}
        getReport={getReport}
      />
      {(status === 'loading' || status === 'generating') && (
        <section className={cls.loadingPanel}>
          <Spinner size={72} />
          <div id='api-message'>
            {status === 'loading'
              ? 'Querying Stocks API...'
              : 'Generating Report'}
          </div>
        </section>
      )}
      {report && (
        <section className={cls.outputPanel}>
          <h2>Your Report 😜</h2>
          <p>{report}</p>
        </section>
      )}
    </>
  );
};

export default StockPredictor;
