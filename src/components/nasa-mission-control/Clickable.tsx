'use client';
// @ts-ignore
import {withSounds} from 'arwes';
import {ComponentProps, ReactNode, MouseEvent} from 'react';

interface ClickableProps extends ComponentProps<'span'> {
  sounds: {
    click: any;
  };
  onClick: (e: any) => void;
  children: ReactNode;
}

const Clickable = ({children, sounds, onClick, ...rest}: ClickableProps) => {
  const clickWithSound = (e: MouseEvent) => {
    sounds.click && sounds.click.play();
    onClick?.(e);
  };

  return (
    <span {...rest} onClick={clickWithSound}>
      {children}
    </span>
  );
};

export default withSounds()(Clickable);
