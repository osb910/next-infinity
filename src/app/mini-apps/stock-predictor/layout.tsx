import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import cls from './StockPredictor.module.css';
import Header from '@/components/mini-apps/stock-predictor/Header';

export const metadata: Metadata = {};

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
