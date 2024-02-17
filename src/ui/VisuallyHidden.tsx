import {type ReactNode, type ComponentProps, type CSSProperties} from 'react';

const hiddenStyles: CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  blockSize: 1,
  inlineSize: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

interface VisuallyHiddenProps extends ComponentProps<'span'> {
  children: ReactNode;
  // as?: string;
}

export const VisuallyHidden = ({
  children,
  // as: Element = 'span',
  ...delegated
}: VisuallyHiddenProps) => (
  <span style={{...hiddenStyles, ...delegated.style}}>{children}</span>
);

export default VisuallyHidden;
