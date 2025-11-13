import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchQuery from './components/SearchQuery'
import MovieCardDetails from './components/MovieCardDetails'

import SearchQueryContext from './context/SearchQueryContext'
import './App.css'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
// write your code here
class App extends Component {
  state = {
    searchQueryList: [],
    searchInput: '',
    totalPages: 0,
    apiStatus: apiStatusList.initial,
    pageNo: 1,
  }

  onChangeSearchInput = text => {
    this.setState({searchInput: text}, this.onTriggerSearchingquery)
  }

  onChangePageNo = page => {
    this.setState({pageNo: page}, this.onTriggerSearchingquery)
  }

  onTriggerSearchingquery = async () => {
    this.setState({apiStatus: apiStatusList.inProgress})
    const {searchInput, pageNo} = this.state
    console.log(pageNo)
    const searchQueryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${`71a895cd5efdaa4d62b846fbb7a5c53e`}&language=en-US&query=${searchInput}&page=${pageNo}`
    const response = await fetch(searchQueryUrl)
    const data = await response.json()
    const updatedData = data.results.map(each => ({
      id: each.id,
      posterPath: each.poster_path,
      title: each.title,
      voteAverage: each.vote_average,
    }))

    const updatedTotalPages = data.total_pages

    if (updatedData.length !== 0) {
      this.setState({
        searchQueryList: updatedData,
        totalPages: updatedTotalPages,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusList.failure,
      })
    }
  }

  render() {
    const {
      searchQueryList,
      searchInput,
      totalPages,
      apiStatus,
      pageNo,
    } = this.state

    return (
      <SearchQueryContext.Provider
        value={{
          apiStatus,
          searchQueryList,
          onTriggerSearchingquery: this.onTriggerSearchingquery,
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
          totalPages,
          onChangePageNo: this.onChangePageNo,
          pageNo,
        }}
      >
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movies/:id" component={MovieCardDetails} />
          <Route exact path="/search" component={SearchQuery} />
        </Switch>
      </SearchQueryContext.Provider>
    )
  }
}

export default App
