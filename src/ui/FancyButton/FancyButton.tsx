import clsx from 'clsx';
import Button, {type AnchorProps, type ButtonProps} from '../Button';
import cls from './FancyButton.module.css';

export type FancyButtonProps = ButtonProps | AnchorProps;

const FancyButton = ({children, ...rest}: FancyButtonProps) => {
  const style = {
    '--bg-gradient': `linear-gradient(135deg,
        hsl(152, 100%, 41%),
        hsl(209, 100%, 66%) 34%,
        hsl(236, 79%, 69%) 67%,
        hsl(328, 54%, 66%)
      )`.replace(/\s+/g, ' '),
  };
  return (
    <Button
      iconLast={true}
      {...rest}
      className={clsx(cls.fancyBtn, rest.className)}
      iconProps={{className: cls.icon, ...rest.iconProps}}
      style={{...style, ...rest.style}}
    >
      {children}
    </Button>
  );
};

export default FancyButton;
