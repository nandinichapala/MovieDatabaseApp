import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import './index.css'

class MovieCardDetails extends Component {
  state = {movieDetailObj: {}, isLoading: false, castDetailsList: []}

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getSingleMovieDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${`71a895cd5efdaa4d62b846fbb7a5c53e`}&language=en-US`

    const response = await fetch(movieDetailsUrl)
    const data = await response.json()
    const castDetailsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${`71a895cd5efdaa4d62b846fbb7a5c53e`}&language=en-US`
    const castDetailsResponse = await fetch(castDetailsUrl)
    const castDetailsData = await castDetailsResponse.json()

    const updatedMovieDetailsObj = {
      id: data.id,
      backdropPath: data.backdrop_path,
      genres: data.genres.map(each => each.name).join(', '),
      overview: data.overview,
      posterPath: data.poster_path,
      releaseDate: data.release_date,
      movieName: data.title,
      rating: data.vote_average,
      time: data.runtime,
    }

    const updatedCastDetails = castDetailsData.cast.map(eachItem => ({
      castId: eachItem.id,
      originalName: eachItem.original_name,
      character: eachItem.character,
      profilePath: eachItem.profile_path,
    }))

    this.setState({
      isLoading: false,
      movieDetailObj: updatedMovieDetailsObj,
      castDetailsList: updatedCastDetails,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderMovieDetailsAndCastDetailsView = () => {
    const {movieDetailObj, castDetailsList} = this.state
    const {
      id,
      posterPath,
      backdropPath,
      movieName,
      rating,
      time,
      genres,
      releaseDate,
      overview,
    } = movieDetailObj

    const movieRating = Math.round(rating * 10) / 10

    return (
      <div className="movie-details-cast-details-container">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdropPath})`,

            backgroundSize: 'cover',

            height: '500px',

            width: '90%',

            margin: '20px 60px',

            borderRadius: '10px',

            paddingTop: '20px',

            paddingLeft: '20px',

            display: 'flex',

            flexDirection: 'column',

            justifyContent: 'flex-start',

            alignItems: 'flex-start',
          }}
        >
          <div className="movie-image-info-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={`moviedetail ${id}`}
              className="movie-details-poster"
            />
            <div className="movie-details-title-rating-container">
              <h1 className="movie-details-title">{movieName}</h1>
              <h1 className="movie-details-rating">Rating: {movieRating}</h1>
              <div className="movie-details-time-genres-container">
                <p className="movie-details-time-content">{time} min</p>
                <p className="movie-details-genres-content">{genres}</p>
              </div>
              <p className="release-date">Release Date: {releaseDate}</p>
            </div>
          </div>
          <h1 className="overview-heading">Overview</h1>
          <p className="overview-description">{overview}</p>
        </div>
        <h1 className="cast-details-heading">Cast</h1>
        <ul className="cast-details-list">
          {castDetailsList.map(eachCast => (
            <li className="cast-details-list-item" key={eachCast.castId}>
              <img
                src={`https://image.tmdb.org/t/p/w500${eachCast.profilePath}`}
                alt={`castDetails ${eachCast.originalName}`}
                className="cast-details-image"
              />
              <p className="cast-details-original-name">
                {eachCast.originalName}
              </p>
              <p className="cast-details-character-name">
                Character: {eachCast.character}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="movie-details-conatiner">
        <Header />
        <div className="movie-details-cast-container">
          {isLoading
            ? this.renderLoadingView()
            : this.renderMovieDetailsAndCastDetailsView()}
        </div>
      </div>
    )
  }
}

export default MovieCardDetails
