import styled from 'styled-components'
import { Rage } from '../../../styles/global'
import { ReactComponent as Information } from '../../../assets/images/LeftBar/icons/information-icon.svg'
import { ReactComponent as Github } from '../../../assets/images/LeftBar/icons/github-icon.svg'
import { ReactComponent as Settings } from '../../../assets/images/LeftBar/icons/settings-icon.svg'


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
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  width: 106px;
  justify-content: space-evenly;
`

export const SettingsIcon = styled(Settings)`
  margin-top: 2px;
  cursor: pointer;
`

export const GithubIcon = styled(Github)`
  cursor: pointer;
`
export const InformationIcon = styled(Information)`
  cursor: pointer;
`

export const GithubIconLink = styled.a``