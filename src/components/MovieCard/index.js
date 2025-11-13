import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieCardDetails} = props
  const {id, posterPath, title, voteAverage} = movieCardDetails

  return (
    <li className="movie-card-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={`movieCard ${title}`}
        className="movie-card-image"
      />
      <div className="movie-heading-rating-btn-container">
        <h1 className="movie-card-heading">{title}</h1>
        <p className="movie-card-rating">Rating {voteAverage}</p>
        <Link to={`/movies/${id}`} className="view-link">
          <button className="view-details-btn" type="button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
