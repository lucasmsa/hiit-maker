import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialised;
  }
`

export const Rage = '#EE373F'
export const LightGray = '#EBEBEB'
export const DarkGray = '#282828'
export const White = '#FFFFFF'
export const FennelFiesta = '#43c079'
export const TransparentLightBlack = 'rgba(0, 0, 0, 0.6)'
export const TransparentDarkBlack = 'rgba(0, 0, 0, 0.87)'
export const TransparentBlackShadow = 'rgba(0, 0, 0, 0.25)'