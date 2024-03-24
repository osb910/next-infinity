'use client';
import {addToCart} from '@/store/elegant-redux/cart-slice';
import {useAppDispatch} from '@/store/elegant-redux/hooks';
import Image, {type StaticImageData} from 'next/image';

type ProductProps = {
  id: string;
  image: StaticImageData;
  title: string;
  price: number;
  description: string;
};

export default function Product({
  id,
  image,
  title,
  price,
  description,
}: ProductProps) {
  const dispatch = useAppDispatch();
  function handleAddToCart() {
    dispatch(addToCart({id, title, price}));
  }

  return (
    <article className='product'>
      <Image src={image} alt={title} fill />
      <div className='product-content'>
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
