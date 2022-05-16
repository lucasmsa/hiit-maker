import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { ReactComponent as LeftArrow } from '../../../assets/images/LeftBar/icons/left_arrow.svg';
import { DarkGray, LightGray } from '../../../styles/global';

interface TooltipContainerProps {
  selectedTooltip: boolean;
}

export const Container = styled.div`
  min-width: 18vw;
  height: 12vh;
  scroll-behavior: smooth;
  justify-content: center;
  margin-left: -1.5rem;
  overflow: hidden;
`;

export const NotActiveItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.75rem;
`;

export const ExerciseWithTooltipContainer = styled.div`
  margin: 0;
  padding: 0;
`;

export const Item = styled.img`
  userselect: none;
  cursor: pointer;
  border: none;
  user-drag: none;
  -webkit-user-drag: none;
  width: 6vw;
  height: 8vh;
  border-radius: 0.75rem;
`;

export const HorizontalScroll = styled(ScrollMenu)``;

export const ShadowLeftArrow = styled(LeftArrow)`
  cursor: pointer;
  -webkit-filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.4));
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.4));
`;

export const ShadowRightArrow = styled(LeftArrow)`
  cursor: pointer;
  transform: scaleX(-1);
  -webkit-filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.4));
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.4));
`;

export const ExerciseItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 12vh;
  width: 8vw;
`;

export const TooltipContainer = styled.div<TooltipContainerProps>`
  transition: ${(props) =>
    props.selectedTooltip
      ? `width 0.25s, height 0.25s, opacity 0.25s 0.25s;`
      : `width 0.25s 0.25s, height 0.25s 0.25s, opacity 0.25s;`}
  opacity: ${(props) => (props.selectedTooltip ? 1 : 0)}
`;

export const Tooltip = styled.div`
  position: absolute;
  z-index: 10;
  transform: translateX(-37.5px) translateY(-10px);
  width: 6.875rem;
  height: 1.5rem;
  display: flex;
  background: ${LightGray};
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
`;

export const TooltipText = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 70%;
  color: ${DarkGray};
`;

export const BalloonTip = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid ${LightGray};
`;

export const ArrowButton = styled.button`
  cursor: pointer;
  display: flex;
  min-width: 1.25rem;
  height: 8vh;
  margin-top: 2.75vh;
  flex-direction: column;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  justify-content: center;
  right: 1%;
  user-select: none;
  align-items: center;
`;
