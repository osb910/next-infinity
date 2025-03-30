'use client';
import dynamic from 'next/dynamic';
import Spinner from '@/ui/Spinner';

const StoreMap = dynamic(() => import('@/ui/InteractiveMap'), {
  loading: () => <Spinner />,
  ssr: false,
});

export default StoreMap;
