import Image from 'next/image';
import img from '/public/img/stock-predictor/logo-dave-text.png';
import cls from './Header.module.css';

const Header = () => {
  return (
    <header className={cls.header}>
      <Image
        src={img}
        width={800}
        height={300}
        alt="Dodgy Dave's Stock Predictions"
      />
    </header>
  );
};

export default Header;
