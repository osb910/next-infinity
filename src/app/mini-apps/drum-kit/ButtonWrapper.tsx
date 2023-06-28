'use client';

import styled from 'styled-components';

const Wrapper = styled.button`
  border: 0.4rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
  cursor: pointer;
  transition: all 618ms ease;

  & kbd {
    display: block;
    font-size: 4rem;
  }

  &.playing {
    transform: scale(1.1);
    border-color: #ffc600;
    box-shadow: 0 0 1rem #ffc600;
  }

  & .sound {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: #ffc600;
  }
`;

export default Wrapper;
