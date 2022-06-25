import styled from 'styled-components';
import { LightGray, TransparentDarkBlack } from '../../../../styles/global';

export const Input = styled.input`
  width: 1.5rem;
  outline: none;
  border: none;
  background-color: ${LightGray};
  font-size: 0.875rem;
  font-weight: 200;
  text-align: center;

  &::selection {
    background: #0934;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

export const InputSurroundings = styled.div`
  background: ${LightGray};
  border-radius: 0.625rem;
  width: 2rem;
  height: 1.4375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.25rem;
`;

export const SecondsText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
