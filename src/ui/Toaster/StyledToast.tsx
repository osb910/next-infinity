import styled, {css} from 'styled-components';

// const slideInX = (x?: number) => keyframes`
//   from {
//     transform: translateX(calc(${101 * (x ?? 1)}%));
//   }
// `;

// const slideOutX = (x?: number) => keyframes`
//   40% {
//     transform: translateX(${-10 * (x ?? 1)}%);
//   }

//   to {
//     transform: translateX(calc(${101 * (x ?? 1)}% + ${2 * (x ?? 1)}rem));
//   }
// `;

const Wrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5em;
  border-radius: 8px;
  color: black;
  color-scheme: light;
  background: white;
  max-width: 100%;
  width: 350px;
  box-shadow: var(--shadow-elevation-medium);
  will-change: transform;

  & .content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    flex: 1;
    padding: 12px 0px;
    font-weight: 600;
  }

  & .content button {
    ${({className}) => css`
      color: var(--color-${className});
    `}
    border-color: currentColor;
    background-color: transparent;
    transition: transform 0.2s ease-in-out;
  }

  & .content button:where(:hover, :focus) {
    transform: scale(1.1);
  }

  & .iconContainer {
    align-self: flex-start;
    flex-shrink: 0;
    padding: 0.75em;
  }

  & .iconContainer svg {
    display: block;
  }

  & .closeButton {
    align-self: flex-start;
    flex-shrink: 0;
    border: none;
    background: transparent;
    padding: 0.75em;
    cursor: pointer;
  }

  &.notice {
    background: hsl(var(--notice-bg-hsl), var(--bg-opacity));
  }

  &.notice .iconContainer {
    color: var(--notice);
  }

  &.warning {
    background: hsl(var(--warning-bg-hsl), var(--bg-opacity));
  }

  &.warning .iconContainer {
    color: var(--warning);
  }

  &.success {
    background: hsl(var(--success-bg-hsl), var(--bg-opacity));
  }

  &.success .iconContainer {
    color: var(--success);
  }

  &.error {
    background: hsl(var(--error-bg-hsl), var(--bg-opacity));
  }

  &.error .iconContainer {
    color: var(--error);
  }
`;

export default Wrapper;
