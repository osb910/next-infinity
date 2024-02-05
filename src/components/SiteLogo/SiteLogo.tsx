import Link from 'next/link';
import {SkipBack} from 'react-feather';
import {PiInfinityDuotone} from 'react-icons/pi';
import styles from './SiteLogo.module.css';
import Image from 'next/image';
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
        {/* <PiInfinityDuotone size={variant === 'primary' ? 36 : 20} /> */}
        <Image
          src='public/img/next-infinity-logo-icon.svg'
          alt='Next Infinity'
          width={36}
          height={36}
        />
        {variant === 'primary' && '/>'}
      </Comp>
    </Link>
  );
};

export default SiteLogo;
