'use client';
import {MotionConfig} from 'framer-motion';
import {type ReactNode} from 'react';

interface ObeyMotionPrefProps {
  children: ReactNode;
}

const ObeyMotionPref = ({children}: ObeyMotionPrefProps) => {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
};

export default ObeyMotionPref;
