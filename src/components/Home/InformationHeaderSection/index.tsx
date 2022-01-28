import React from 'react'
import { InformationContainer, HeaderContainer, HeaderTexts, LeftTriangle } from './styles'

interface InformationHeaderSectionProps {
  icon: any;
  title: string;
  backgroundColor: 'BLACK' | 'RED';
}

const InformationHeaderSection = ({icon, title, backgroundColor}: InformationHeaderSectionProps) => {
  return (
    <InformationContainer>
      <LeftTriangle />
      <HeaderContainer color={backgroundColor}>
        {icon}
        <HeaderTexts>{title}</HeaderTexts>
      </HeaderContainer>
    </InformationContainer>
  )
}

export default InformationHeaderSection