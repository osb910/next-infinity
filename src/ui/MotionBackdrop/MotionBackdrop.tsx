import {motion, type MotionProps} from 'framer-motion';
import cls from './MotionBackdrop.module.css';

export interface MotionBackdropProps extends Partial<MotionProps> {
  layoutId: string;
}

const MotionBackdrop = ({layoutId, ...rest}: MotionBackdropProps) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={`${cls.backdrop}`}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 280,
      }}
      tabIndex={-1}
      {...rest}
    />
  );
};

export default MotionBackdrop;
