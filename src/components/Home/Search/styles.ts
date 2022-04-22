import styled from 'styled-components';
import { TransparentBlackShadow, White } from '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.75rem;
  box-shadow: 0rem 0.0625rem 0.25rem ${TransparentBlackShadow};
  background-color: ${White};
  width: 17rem;
  border-radius: 0.625rem;
  height: 3rem;
  padding-right: 1.125rem;
`;

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 15rem;
  font-family: Montserrat;
  &&::-webkit-input-placeholder {
    color: #c3c3c3;
    font-weight: 300;
  }

  &&::-moz-placeholder {
    color: #c3c3c3;
    font-weight: 300;
  }

  &&:-ms-input-placeholder {
    color: #c3c3c3;
    font-weight: 300;
  }

  &&:-moz-placeholder {
    /* Firefox 18- */
    color: #c3c3c3;
    font-weight: 300;
  }
`;

export const SearchIcon = styled.img`
  margin: 0 0.875rem;
`;
