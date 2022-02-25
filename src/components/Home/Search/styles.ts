import styled from 'styled-components';
import { TransparentBlackShadow, White } from '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  box-shadow: 0px 1px 4px ${TransparentBlackShadow};
  background-color: ${White};
  width: 272px;
  border-radius: 10px;
  height: 48px;
  padding-right: 18px;
`;

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 240px;
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
  margin: 0 14px;
`;
