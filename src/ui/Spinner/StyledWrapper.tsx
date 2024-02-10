'use client';

import styled, {keyframes} from 'styled-components';

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.span`
  display: block;
  width: max-content;
  margin: 0.25em;
  color: white;
  animation: ${spin} var(--speed) linear infinite;

  [dir='rtl'] & {
    animation-direction: reverse;
  }

  & svg {
    display: block;
  }
`;

export default Wrapper;
