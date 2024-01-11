import {useState, useEffect, ReactNode, useCallback} from 'react';
import {X as Close} from 'react-feather';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import VisuallyHidden from '@/ui/VisuallyHidden';
import Wrapper from './StyledModal';
import styles from './Modal.module.css';
import {motion} from 'framer-motion';

export interface ModalProps {
  title: string;
  dismiss: Function;
  dismissText: string;
  children: ReactNode;
  lang?: string;
}

const Modal = ({
  title,
  dismiss,
  dismissText = 'Dismiss Modal',
  children,
  lang,
}: ModalProps) => {
  const [exiting, setExiting] = useState<boolean>(false);
  const animationDuration = 618;

  const smoothlyDismiss = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(() => {
      setExiting(false);
      dismiss();
    }, animationDuration);
    return () => clearTimeout(timer);
  }, [dismiss]);

  useEffect(() => {
    const handleKeyDown = ({key}: {key: string}) => {
      key === 'Escape' && smoothlyDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismiss, smoothlyDismiss]);

  const blurKeyframes = exiting
    ? ['blur(3px)', 'blur(0px)']
    : ['blur(0px)', 'blur(3px)'];
  const backgroundColorKeyframes = exiting
    ? ['hsl(0deg 0% 0% / 0.5)', 'hsl(0deg 0% 0% / 0%)']
    : ['hsl(0deg 0% 0% / 0%)', 'hsl(0deg 0% 0% / 0.5)'];

  const opacityKeyframes = exiting ? [1, 0] : [0, 1];
  const scaleKeyframes = exiting ? [1, 0.5] : [0.7, 1];

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <motion.aside className={styles.aside}>
          <motion.div
            className={`backdrop ${styles.backdrop} ${
              exiting ? styles.exiting : ''
            } ${exiting ? 'exiting' : ''}`}
            onClick={smoothlyDismiss}
            animate={{
              backdropFilter: blurKeyframes,
              backgroundColor: backgroundColorKeyframes,
            }}
            transition={{duration: 1.6, type: 'spring', bounce: 0.5}}
          />
          <motion.div
            className={`modal ${styles.modal} ${
              exiting ? styles.exiting : ''
            } ${exiting ? 'exiting' : ''} ${lang === 'ar' ? 'rtl' : 'ltr'}`}
            role='dialog'
            aria-modal='true'
            aria-label={title}
            animate={{
              opacity: opacityKeyframes,
              scale: scaleKeyframes,
            }}
            transition={{duration: 1.6, type: 'spring', bounce: 0.5}}
          >
            <motion.button
              type='button'
              className={`dismissBtn ${styles.dismissBtn}`}
              onClick={smoothlyDismiss}
              whileHover={{
                transform: 'scale(1.2) rotate(-90deg)',
              }}
              whileFocus={{
                transform: 'scale(1.2) rotate(-90deg)',
              }}
              transition={{duration: 0.4, type: 'spring', bounce: 0.3}}
            >
              <VisuallyHidden>{dismissText}</VisuallyHidden>
              <Close />
            </motion.button>
            {children}
          </motion.div>
        </motion.aside>
      </RemoveScroll>
    </FocusLock>
  );
};

export default Modal;
