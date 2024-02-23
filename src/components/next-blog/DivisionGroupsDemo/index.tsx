'use client';
import dynamic from 'next/dynamic';
import Spinner from '@/ui/Spinner';

const DivisionGroupsDemo = dynamic(() => import('./DivisionGroupsDemo'), {
  loading: () => <Spinner />,
});

export default DivisionGroupsDemo;
