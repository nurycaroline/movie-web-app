import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Service from '.';
import {
  responseGenres,
  responsePopularMoviesPag1,
  responsePopularMoviesPag2,
} from './mock/movies';

chai.use(chaiAsPromised);
const { expect } = chai;

test('Retorno de Filmes populares pagina 1', async () => {
  const res = await Service.moviesList();
  expect(JSON.stringify(res)).to.be.equal(JSON.stringify(responsePopularMoviesPag1));
});

test('Retorno de Filmes populares pagina 2', async () => {
  const res = await Service.moviesList(2);
  expect(JSON.stringify(res)).to.be.equal(JSON.stringify(responsePopularMoviesPag2));
});


test('Retorno de Filmes populares', async () => {
  const res = await Service.genresList();

  expect(JSON.stringify(res)).to.be.equal(
    JSON.stringify(responseGenres),
  );
});
