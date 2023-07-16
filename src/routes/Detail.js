import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <h1>Detail</h1>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <div>
        <h3 key={movie.id}>{movie.title_long}</h3>
        <li>
          <strong>Genres</strong>
        </li>
        <ul key={movie.imdb_code}>
          {movie.genres && (
            <div>
              {movie.genres.map((genre) => (
                <p key={genre}>{genre}</p>
              ))}
            </div>
          )}
        </ul>
        <li key={movie.runtime}>
          <strong>Runtime</strong> : <i>{movie.runtime}</i> minutes
        </li>
        <li key={movie.rating}>
          <strong>Rating</strong>: ⭐{movie.rating}
        </li>
      </div>
      <div>
        <h2>
          <Link to={`https://yts.mx/movies/${movie.slug}`}>Go To Link</Link>
        </h2>
      </div>
    </div>
  );
}
export default Detail;
