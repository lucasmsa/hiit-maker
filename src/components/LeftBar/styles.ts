import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EE373F;
  width: 325px;
  height: 100vh;
  padding-top: 42px;
`

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`

export const Dumbell = styled.img`
  margin: 0;
  width: 32px;
  height: 32px;
`

export const HeaderLeftText = styled.h1`
  color: #fff;
  font-style: normal;
  font-family: Montserrat;
  text-shadow: 0.1px 0.1px 5px #541612;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  letter-spacing: 0.02em;
`

export const IconsContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-evenly;
`