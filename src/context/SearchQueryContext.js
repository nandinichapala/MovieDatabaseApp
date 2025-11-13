import React from 'react'

const SearchQueryContext = React.createContext({
  searchQueryList: [],
  onTriggerSearchingquery: () => {},
  onChangeSearchInput: () => {},
  onChangePageNo: () => {},
})

export default SearchQueryContext
