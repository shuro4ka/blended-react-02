export const MoviesGallery = ({movies, onModal}) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key = {movie.id}>
          <h1>{movie.title}</h1>
          <button onClick={() => onModal({src: movie.backdrop_path, alt: movie.title})}>Show poster</button>
        </li>
      ))}
    </ul>
  );
};
