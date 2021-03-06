import styled from 'styled-components';

export const PlayButton = styled.div`
  cursor: pointer;
  width: 8rem;
  height: 8rem;
  background: radial-gradient(rgba(238, 55, 63, 0.8) 60%, rgba(255, 255, 255, 1) 62%);
  border-radius: 50%;
  position: relative;
  display: block;
  margin: 2.5rem auto 0 auto;
  box-shadow: 0rem 0rem 1.5625rem 0.1875rem rgba(245, 135, 140, 0.8);
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-40%) translateY(-50%);
    transform: translateX(-40%) translateY(-50%);
    transform-origin: center center;
    width: 0;
    height: 0;
    border-top: 0.9375rem solid transparent;
    border-bottom: 0.9375rem solid transparent;
    border-left: 1.5625rem solid #fff;
    z-index: 100;
    -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`;

export const PausedButton = styled.div`
  cursor: pointer;
  width: 8rem;
  height: 8rem;
  background: radial-gradient(rgba(238, 55, 63, 0.8) 60%, rgba(255, 255, 255, 1) 62%);
  border-radius: 50%;
  position: relative;
  display: block;
  margin: 2.5rem auto 0 auto;
  box-shadow: 0rem 0rem 1.5625rem 0.1875rem rgba(245, 135, 140, 0.8);
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-40%) translateY(-50%);
    transform: translateX(-40%) translateY(-50%);
    transform-origin: center center;
    border-top: 1.25rem solid #fff;
    border-bottom: 1.25rem solid #fff;
    border-left: 1.25rem solid #fff;
    border-right: 1.25rem solid #fff;
    left: 47.5%;
    z-index: 100;
    -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`;

export const PlayButtonHovered = styled(PlayButton)`
  &:before {
    content: '';
    position: absolute;
    width: 12rem;
    height: 12rem;
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    -webkit-animation: pulsate1 2s;
    animation: pulsate1 2s;
    -webkit-animation-direction: forwards;
    animation-direction: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: steps;
    animation-timing-function: steps;
    opacity: 1;
    border-radius: 50%;
    border: 0.3125rem solid rgba(255, 255, 255, 0.75);
    top: -30%;
    left: -30%;
    background: rgba(198, 16, 0, 0);
  }

  @-webkit-keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0rem 0rem 1.5625rem 0.1875rem rgba(255, 255, 255, 0.75),
        0rem 0rem 1.5625rem 0.625rem rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;
    }
  }

  @keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0rem 0rem 1.5625rem 0.1875rem rgba(255, 255, 255, 0.75),
        0rem 0rem 1.5625rem 0.625rem rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;
    }
  }
`;

export const PausedButtonHovered = styled(PausedButton)`
  &:before {
    content: '';
    position: absolute;
    width: 12rem;
    height: 12rem;
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    -webkit-animation: pulsate1 2s;
    animation: pulsate1 2s;
    -webkit-animation-direction: forwards;
    animation-direction: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: steps;
    animation-timing-function: steps;
    opacity: 1;
    border-radius: 50%;
    border: 0.3125rem solid rgba(255, 255, 255, 0.75);
    top: -30%;
    left: -30%;
    background: rgba(198, 16, 0, 0);
  }

  @-webkit-keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0rem 0rem 1.5625rem 0.1875rem rgba(255, 255, 255, 0.75),
        0rem 0rem 1.5625rem 0.625rem rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;
    }
  }

  @keyframes pulsate1 {
    0% {
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      opacity: 1;
      box-shadow: inset 0rem 0rem 1.5625rem 0.1875rem rgba(255, 255, 255, 0.75),
        0rem 0rem 1.5625rem 0.625rem rgba(255, 255, 255, 0.75);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1);
      opacity: 0;
      box-shadow: none;
    }
  }
`;
