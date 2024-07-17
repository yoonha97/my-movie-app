import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movieDetail}>
          <img
            src={movie.large_cover_image}
            alt={movie.title}
            className={styles.coverImg}
          />
          <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            <h2 className={styles.year}>{movie.year}</h2>
            <p className={styles.summary}>{movie.description_full}</p>
            <ul className={styles.genres}>
              {movie.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
