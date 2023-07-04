'use client';
import styled, {css} from 'styled-components';

const Wrapper = styled.li`
  ${(props: {poster: string}) => css`
    background-image: url(${props.poster});
  `}
  background-size: cover;
  background-blend-mode: multiply;
`;

export default Wrapper;
