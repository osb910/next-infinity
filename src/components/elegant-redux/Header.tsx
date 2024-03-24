'use client';

import {useState} from 'react';

import Cart from './Cart';
import {useAppSelector} from '@/store/elegant-redux/hooks';
import Image from 'next/image';

export default function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const cartQty = useAppSelector(state =>
    state.items.reduce((acc, i) => acc + i.quantity, 0)
  );

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id='main-header'>
        <div id='main-title'>
          <Image src='logo.png' alt='Elegant model' fill />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQty})</button>
        </p>
      </header>
    </>
  );
}
