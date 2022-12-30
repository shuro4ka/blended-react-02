import { Component } from 'react';
import { fetchMovies } from 'MovieApi';
import { Button } from 'components/Button';
import { MoviesGallery } from 'components/MoviesGallery';
import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    movies: [],
    page: 1,
    isLoading: false,
    error: '',
    isMovieListShown: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.isMovieListShown !== this.state.isMovieListShown &&
        this.state.isMovieListShown) ||
      prevState.page !== this.state.page
    ) {
      fetchMovies(this.state.page).then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      });
    }
    if (
      prevState.isMovieListShown !== this.state.isMovieListShown &&
      !this.state.isMovieListShown
    ) {
      this.setState({ movies: [], page: 1 });
    }
  }
  toggleVisibility = () => {
    this.setState(prevState => ({
      isMovieListShown: !prevState.isMovieListShown,
    }));
  };

  openModal = image => {
    this.setState({ currentImage: image });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isMovieListShown, movies, currentImage } = this.state;
    return (
      <>
        <Button
          text={isMovieListShown ? 'Hide Movies' : 'Show Movies'}
          clickHandler={this.toggleVisibility}
        />
        {movies.length > 0 && (
          <>
            <MoviesGallery movies={movies} onModal={this.openModal} />
            <Button text="Load More" clickHandler={this.loadMore} />
          </>
        )}
        {currentImage && (
          <Modal image={currentImage} offModal={this.closeModal} />
        )}
      </>
    );
  }
}
