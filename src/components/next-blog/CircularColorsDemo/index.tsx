'use client';
import dynamic from 'next/dynamic';
import Spinner from '@/ui/Spinner';

const CircularColorsDemo = dynamic(() => import('./CircularColorsDemo'), {
  loading: () => <Spinner />,
});

export default CircularColorsDemo;
