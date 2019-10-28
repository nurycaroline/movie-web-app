import axios from 'axios';
import Config from '../config';

const { TOKEN, ROOT_URL } = Config;

const Service = {
  async moviesList(page = 1) {
    try {
      const response = await axios.get(
        `${ROOT_URL}movie/popular?api_key=${TOKEN}&language=pt-BR&page=${page}`,
      );
      return response.data;
    } catch (error) {
      return false;
    }
  },

  async genresList() {
    try {
      const response = await axios.get(
        `${ROOT_URL}genre/movie/list?api_key=${TOKEN}&language=pt-BR`,
      );
      return response.data.genres;
    } catch (error) {
      return false;
    }
  },
};

export default Service;
