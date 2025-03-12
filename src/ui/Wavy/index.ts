import dynamic from 'next/dynamic';
const Wavy = dynamic(() => import('./Wavy'), {
  ssr: false,
});

export * from './Wavy';

export default Wavy;
