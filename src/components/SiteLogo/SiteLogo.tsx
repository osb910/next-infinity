import Link from 'next/link';
import {SkipBack} from 'react-feather';
import {PiInfinityDuotone} from 'react-icons/pi';
import styles from './SiteLogo.module.css';
interface SiteLogoProps {
  variant?: 'primary' | 'secondary';
}

const SiteLogo = ({variant = 'primary'}: SiteLogoProps) => {
  const Comp = variant === 'primary' ? 'h1' : 'h2';
  return (
    <Link href='/' className={styles.link}>
      {variant === 'secondary' && <SkipBack size={12} />}
      <Comp className={`${styles.logo} ${styles[variant]}`}>
        {variant === 'primary' && '<'}Next{' '}
        <PiInfinityDuotone size={variant === 'primary' ? 36 : 20} />
        {variant === 'primary' && '/>'}
      </Comp>
    </Link>
  );
};

export default SiteLogo;
