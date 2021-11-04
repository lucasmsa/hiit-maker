import styled from 'styled-components'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { ReactComponent as LeftArrow } from '../../assets/images/LeftBar/icons/left_arrow.svg'

interface TooltipContainerProps {
  selectedTooltip: boolean
}

export const Container = styled.div`
  width: 270px;
  height: 80px;
  justify-content: flex-start;
`

export const NotActiveItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
`

export const ExerciseWithTooltipContainer = styled.div`
  margin: 0;
  padding: 0;
`

export const Item = styled.img`
  userSelect: none;
  cursor: pointer;
  border: none;
  user-drag: none;
  -webkit-user-drag: none;
  width: 84px;
  height: 60px;
  border-radius: 12px;
`

export const HorizontalScroll = styled(ScrollMenu)`
`

export const ShadowLeftArrow = styled(LeftArrow)`
  cursor: pointer;
  -webkit-filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, .4));
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, .4));
  position: fixed;
  z-index: 30;
`

export const ShadowRightArrow = styled(LeftArrow)`
  cursor: pointer;
  transform: scaleX(-1);
  -webkit-filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, .4));
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, .4));
  position: fixed;
`

export const ExerciseItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
`

export const TooltipContainer = styled.div<TooltipContainerProps>`
  transition: ${props => (props.selectedTooltip ? `width 0.25s, height 0.25s, opacity 0.25s 0.25s;` : `width 0.25s 0.25s, height 0.25s 0.25s, opacity 0.25s;`)}
  opacity: ${props => (props.selectedTooltip ? 1 : 0)}
`

export const Tooltip = styled.div`
  position: absolute;
  transform: translateX(-37.5px) translateY(-10px);
  width: 110px;
  height: 20px;
  display: flex;
  background: #EBEBEB;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`

export const TooltipText = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
  color: #282828;
`

export const BalloonTip = styled.div`
  width: 0; 
  height: 0; 
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #EBEBEB;
`