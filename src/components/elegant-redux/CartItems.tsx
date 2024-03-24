'use client';

import {
  addToCart,
  removeFromCart,
  type CartItem,
} from '@/store/elegant-redux/cart-slice';
import {useAppDispatch, useAppSelector} from '@/store/elegant-redux/hooks';
import {approx} from '@/utils/numbers';

export default function CartItems() {
  const cartItems = useAppSelector(state => state.items);
  const dispatch = useAppDispatch();
  const totalPrice = cartItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );
  const formattedPrice = approx(totalPrice);

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart({id: id}));
  };

  return (
    <div id='cart'>
      {cartItems.length === 0 && <p>No items in cart!</p>}

      {cartItems.length > 0 && (
        <ul id='cart-items'>
          {cartItems.map(item => {
            const formattedPrice = `$${approx(item.price)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className='cart-item-actions'>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p id='cart-total-price'>
        Cart Total: <strong>${formattedPrice}</strong>
      </p>
    </div>
  );
}
