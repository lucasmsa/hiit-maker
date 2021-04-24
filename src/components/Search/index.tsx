import React from 'react'
import { Container, SearchInput } from './styles'
import { ReactComponent as SearchIcon } from '../../assets/images/LeftBar/icons/search_icon.svg'

const Search = () => {
  return (
    <Container>
      <SearchIcon style={{ marginLeft: '10px', marginRight: '6px' }} />
      <SearchInput type="text" placeholder="search exercise, muslce..." />
    </Container>
  )
}

export default Search