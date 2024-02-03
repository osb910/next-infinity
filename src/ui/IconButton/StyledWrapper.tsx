import styled, {keyframes} from 'styled-components';

const bump = keyframes`
  0% {
    transform: scale(1) rotate(var(--rotation-deg));
  }
  10% {
    transform: scale(0.95) rotate(var(--rotation-deg));
  }
  30% {
    transform: scale(1.04) rotate(var(--rotation-deg));
  }
  50% {
    transform: scale(1.08) rotate(var(--rotation-deg));
  }
  100% {
    transform: scale(1) rotate(var(--rotation-deg));
  }
`;

const Wrapper = styled.button`
  --sec-color: #a8dadc;
  --ter-color: #457b9d;
  --hex-color: #1d3557;
  --sept-color: #e1eaee;
  --rotation-deg: 45deg;
  --size: 1.75rem;
  --border-top-color: hsl(0deg 0% 80%);
  --border-bottom-color: hsl(0deg 0% 60%);

  block-size: var(--size);
  inline-size: var(--size);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  background-color: var(--sept-color);
  cursor: pointer;
  font-family: 'Calibri';
  color: var(--hex-color);
  box-shadow: 0px 2px 20px rgba(var(--bg-elevated-rgb) 0.15);
  transition: all 200ms ease-in-out;
  border: 3px solid hsl(0deg 0% 85%);
  border-block-start-color: var(--border-top-color);
  border-inline-start-color: var(--border-top-color);
  border-block-end-color: var(--border-bottom-color);
  border-inline-end-color: var(--border-bottom-color);
  transform: rotate(var(--rotation-deg));
  background: hsl(0deg 0% 93%);

  &:active {
    border-block-start-color: var(--border-bottom-color);
    border-inline-start-color: var(--border-bottom-color);
    border-block-end-color: var(--border-top-color);
    border-inline-end-color: var(--border-top-color);
    background: hsl(0deg 0% 85%);
  }

  &:where(:hover, :focus) {
    transform: scale(1.08) rotate(var(--rotation-deg));
  }

  .rtl &,
  [dir='rtl'] & {
    --rotation-deg: -45deg;
  }

  .rtl & svg,
  [dir='rtl'] & svg {
    --rotation-deg: 135deg;
  }

  & svg {
    width: 1.25rem;
    margin: 0;
    stroke: var(--hex-color);
    stroke: rgb(var(--bg-elevated-rgb));
    border-radius: 50%;
    transform: rotate(calc(var(--rotation-deg) * -1));
  }

  .dark & {
    color: var(--sept-color);
  }

  &.bump {
    animation: ${bump} 350ms ease-in-out;
  }

  @media (min-width: 24rem) {
    --size: 2rem;
    & svg {
      width: 1.5rem;
    }
  }

  @media (min-width: 48rem) {
    --size: 2.25rem;
  }

  @media (min-width: 72rem) {
    --size: 2.5rem;
    & svg {
      width: 1.75rem;
    }
  }
`;

export default Wrapper;
