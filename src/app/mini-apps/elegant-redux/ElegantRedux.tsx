import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import cls from './ElegantRedux.module.css';
import Header from '@/components/elegant-redux/Header';
import Shop from '@/components/elegant-redux/Shop';
import Product from '@/components/elegant-redux/Product';
import {DUMMY_PRODUCTS} from './dummy-products';

export const metadata: Metadata = {
  title: 'Elegant Redux',
};

const ElegantRedux: AppPage<{}> = async ({}) => {
  return (
    <>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </>
  );
};

export default ElegantRedux;
