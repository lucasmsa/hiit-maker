import styled from 'styled-components'
import { Rage } from '../../../styles/global'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Rage};
  width: 325px;
  height: 100vh;
  padding-top: 42px;
`

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`

export const IconsContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-evenly;
`