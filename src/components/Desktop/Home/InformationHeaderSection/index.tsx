import React from 'react';
import {
  InformationContainer,
  HeaderContainer,
  HeaderTexts,
  LeftTriangle,
  RightTriangle
} from './styles';

interface InformationHeaderSectionProps {
  icon?: any;
  reverse?: boolean;
  small?: boolean;
  medium?: boolean;
  title: string;
  backgroundColor: 'BLACK' | 'RED';
}

const InformationHeaderSection = ({
  icon,
  small,
  title,
  medium,
  reverse,
  backgroundColor
}: InformationHeaderSectionProps) => {
  return (
    <InformationContainer small={!!small} medium={!!medium}>
      {!reverse && <LeftTriangle />}
      <HeaderContainer small={!!small} medium={!!medium} color={backgroundColor}>
        {icon}
        <HeaderTexts>{title}</HeaderTexts>
      </HeaderContainer>
      {reverse && <RightTriangle />}
    </InformationContainer>
  );
};

export default InformationHeaderSection;
