import styled from 'styled-components'

export const Input = styled.input`
  width: 24px;
  outline: none;
  border: none;
  background-color: #EBEBEB;
  font-size: 14px;
  font-weight: 200;
  text-align: center;

  & ::selection {
    background: #0934;
  }
`

export const InputSurroundings = styled.div` 
  background: #EBEBEB;
  border-radius: 10px;
  width: 32px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`

export const SecondsText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.87);
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`