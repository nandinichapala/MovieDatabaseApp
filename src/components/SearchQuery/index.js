import './index.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import SearchQueryContext from '../../context/SearchQueryContext'
import Header from '../Header'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const SearchQuery = () => (
  <SearchQueryContext.Consumer>
    {value => {
      const {
        searchQueryList,
        apiStatus,
        totalPages,
        pageNo,
        onChangePageNo,
      } = value

      const renderLoadingView = () => (
        <div className="loader-container">
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      )

      const apiCallBack = page => {
        onChangePageNo(page)
      }

      const renderSearchView = () => (
        <div className="searchquery-list-pagination-container">
          <ul className="searchquery-movie-list">
            {searchQueryList.map(each => (
              <MovieCard key={each.id} movieCardDetails={each} />
            ))}
          </ul>
          <Pagination
            totalPages={totalPages}
            apiCallBack={apiCallBack}
            pageNo={pageNo}
          />
        </div>
      )

      const renderEmptyView = () => (
        <div className="empty-view-container">
          <h1>Sorry! there is No Information</h1>
          <p>Could you give any movie name please!</p>
        </div>
      )

      const renderSearchQueryRelatedView = () => {
        switch (apiStatus) {
          case 'SUCCESS':
            return renderSearchView()
          case 'INPROGRESS':
            return renderLoadingView()
          case 'FAILURE':
            return renderEmptyView()
          default:
            return null
        }
      }

      return (
        <div className="searchquery-main-container">
          <Header />
          <div className="searchquery-content-container">
            {renderSearchQueryRelatedView()}
          </div>
        </div>
      )
    }}
  </SearchQueryContext.Consumer>
)

export default SearchQuery
