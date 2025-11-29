import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import Header from '../Header'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

class Upcoming extends Component {
  state = {popularContentList: [], isLoading: false, totalPages: 0, pageNo: 1}

  componentDidMount() {
    this.getPopularContent()
  }

  apiCallBack = page => {
    console.log(page)
    this.setState({pageNo: page}, this.getPopularContent)
  }

  getPopularContent = async () => {
    this.setState({isLoading: true})
    const {pageNo} = this.state
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${`71a895cd5efdaa4d62b846fbb7a5c53e`}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedList = data.results.map(each => ({
      id: each.id,
      posterPath: each.poster_path,
      title: each.title,
      voteAverage: each.vote_average,
    }))
    const updatedTaotalPages = data.total_pages
    this.setState({
      isLoading: false,
      popularContentList: updatedList,
      totalPages: updatedTaotalPages,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPopularContentView = () => {
    const {popularContentList} = this.state
    return (
      <div className="upcoming-list-pagination-container">
        <ul className="upcoming-movie-list">
          {popularContentList.map(each => (
            <MovieCard key={each.id} movieCardDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, totalPages, pageNo} = this.state

    return (
      <div className="upcoming-main-container">
        <Header />
        <div className="upcoming-content-container">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularContentView()}
        </div>
        <Pagination
          totalPages={totalPages}
          apiCallBack={this.apiCallBack}
          pageNo={pageNo}
        />
      </div>
    )
  }
}

export default Upcoming
