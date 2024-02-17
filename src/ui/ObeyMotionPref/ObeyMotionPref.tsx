'use client';
import {IS_SERVER} from '@/utils/path';
import {MotionConfig} from 'framer-motion';
import {type ReactNode} from 'react';

interface ObeyMotionPrefProps {
  children: ReactNode;
}

const ObeyMotionPref = ({children}: ObeyMotionPrefProps) => {
  if (!IS_SERVER) return children;
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
};

export default ObeyMotionPref;
