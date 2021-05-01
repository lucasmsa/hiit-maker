import styled from 'styled-components'

export const App = styled.div`
  width: 280px;
  height: 80px;
`

export const ActiveItem = styled.img`
  border: 1px green solid;
  max-width: 100px;
  max-height: 100px;
  padding: 0 12px;
  userSelect: none;
  cursor: pointer;
`

export const NotActiveItem = styled.img`
  padding: 0 12px;
  userSelect: none;
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  border: none;
`