import React from 'react'
import { Container, SearchInput } from './styles'
import { ReactComponent as SearchIcon } from '../../assets/images/LeftBar/icons/search_icon.svg'

interface SearchProps {
  changeExerciseSearch: (value: string) => void
}

const Search = ({ changeExerciseSearch } : SearchProps) => {
  return (
    <Container>
      <SearchIcon style={{ marginLeft: '10px', marginRight: '12px' }} />
      <SearchInput
        type="text"
        maxLength={50}
        placeholder="search exercise, muslce..."
        onChange={(e) => changeExerciseSearch(e.target.value)}
      />
    </Container>
  )
}

export default Search