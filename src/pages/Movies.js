import React, { Component } from 'react';
import Service from '../services';
import Pagination from '../components/Pagination';
import Movie from '../components/Movie';
import Search from '../components/Search';
import './style.scss';

class Movies extends Component {
  state = {
    listGenre: [],
    listMovies: [],
    listMoviesBkp: [],
    page: 1,
    totalPages: 0,
    totalResults: 0,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getGenres();
    await this.getMovies();
    this.setState({ loading: false });
  }

  getGenres = async () => {
    const listGenre = await Service.genresList();
    this.setState({ listGenre });
  };

  getMovies = async (numPage = 1) => {
    this.setState({ loading: true });
    const {
      listMoviesBkp,
      page,
      totalPages,
      totalResults,
    } = this.state;
    let list = [];
    let respMovies = [];

    if (numPage < page) {
      list = listMoviesBkp.slice(0, listMoviesBkp.length - 20);
    } else {
      respMovies = await Service.moviesList(numPage);
      list = listMoviesBkp.concat(respMovies.results);
    }

    this.setState({
      filter: '',
      loading: false,
      page: numPage,
      listMoviesBkp: list,
      listMovies: list,
      totalPages: respMovies.total_pages || totalPages,
      totalResults: respMovies.total_results || totalResults,
    });
  };

  findGenre = (id) => {
    const { listGenre } = this.state;
    return listGenre.find(x => x.id === id).name;
  };

  listGenres = list => (list && list.length > 0
    ? list.map(genre => this.findGenre(genre)).join(', ')
    : '');

  backPage = () => {
    const { page } = this.state;
    this.getMovies(page - 1);
  };

  nextPage = () => {
    const { page } = this.state;
    this.getMovies(page + 1);
  };

  searchBy = (value) => {
    const { listMoviesBkp } = this.state;
    const newList = value
      ? listMoviesBkp.filter(x => x.title.toUpperCase().includes(value.toUpperCase()))
      : listMoviesBkp;
    this.setState({ listMovies: newList, filter: value });
  };

  render() {
    const {
      listMovies,
      page,
      totalPages,
      loading,
      filter,
    } = this.state;

    const listMoviesSlice = listMovies && listMovies.length > 0
      ? listMovies.slice(listMovies.length - 20)
      : [];

    return (
      <div className="movies">
        <h2>Filmes mais populares</h2>

        <Search onChangeSearchBy={this.searchBy} value={filter} />

        <div className="list-movies">
          {loading && 'Carregando...'}
          {listMoviesSlice.map(movie => (
            <Movie
              key={movie.id}
              title={movie.title}
              image={movie.poster_path || movie.backdrop_path}
              overview={movie.overview}
              genres={this.listGenres(movie.genre_ids)}
            />
          ))}
        </div>

        <Pagination
          pageActual={page}
          onClickBackPage={this.backPage}
          onClickNextPage={this.nextPage}
          totalPages={totalPages}
        />
      </div>
    );
  }
}

export default Movies;
