import {type ComponentPropsWithoutRef} from 'react';
import Link, {type LinkProps} from 'next/link';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    href?: string;
  };

const isAnchorProps = (
  props: ButtonProps | AnchorProps
): props is AnchorProps => {
  return 'href' in props;
};

const Button = (props: ButtonProps | AnchorProps) => {
  if (isAnchorProps(props)) {
    return <Link className='button' {...props}></Link>;
  }

  return <button className='button' {...props}></button>;
};

export default Button;
