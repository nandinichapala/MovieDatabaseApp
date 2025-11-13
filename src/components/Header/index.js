import './index.css'
import {Link, withRouter} from 'react-router-dom'
import SearchQueryContext from '../../context/SearchQueryContext'

const Header = props => (
  <SearchQueryContext.Consumer>
    {value => {
      const {searchInput, onTriggerSearchingquery, onChangeSearchInput} = value

      const onChangeSearchInputValue = event => {
        onChangeSearchInput(event.target.value)
      }

      const onClickSearchBtn = event => {
        event.preventDefault()
        const {history} = props
        onTriggerSearchingquery()
        history.push('/search')
      }

      return (
        <div className="header-container">
          <h1 className="navbar-heading">MovieDb</h1>
          <div className="nav-search-btn-container">
            <ul className="nav-list-container">
              <Link to="/">
                <li className="nav-list-item">
                  <button className="nav-list-btn" type="button">
                    <h1>Popular</h1>
                  </button>
                </li>
              </Link>
              <Link to="/top-rated">
                <li className="nav-list-item">
                  <button className="nav-list-btn" type="button">
                    <h1>Top Rated</h1>
                  </button>
                </li>
              </Link>
              <Link to="/upcoming">
                <li className="nav-list-item">
                  <button className="nav-list-btn" type="button">
                    <h1>Upcoming</h1>
                  </button>
                </li>
              </Link>
            </ul>
            <input
              type="search"
              className="search-container"
              placeholder="Movie Name"
              value={searchInput}
              onChange={onChangeSearchInputValue}
            />
            <button
              className="search-btn"
              type="button"
              onClick={onClickSearchBtn}
            >
              Search
            </button>
          </div>
        </div>
      )
    }}
  </SearchQueryContext.Consumer>
)

export default withRouter(Header)
