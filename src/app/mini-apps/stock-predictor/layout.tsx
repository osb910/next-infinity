import Header from '@/components/mini-apps/stock-predictor/Header';
import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import cls from './StockPredictor.module.css';

export const metadata: Metadata = {
  title: 'Stock Predictor',
};

const StockPredictorLayout = async ({children}: {children: ReactNode}) => {
  return (
    <>
      <Header />
      <main className={cls.main}>{children}</main>;
      <footer className={cls.footer}>
        &copy; This is not real financial advice!
      </footer>
    </>
  );
};

export default StockPredictorLayout;
