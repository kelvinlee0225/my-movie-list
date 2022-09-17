import moment from "moment";
import { BaseService } from "./BaseService";

export class MoviesService extends BaseService {
  async getMovies({ page = 1, sortBy }) {
    try {
      const endDate = moment(new Date()).format("YYYY-MM-DD");
      const startDate = moment(startDate).subtract(47, "days");
      const response = await this.axios.get(
        `/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=${sortBy}&page=${page}`
      );
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getMovieDetail(id) {
    try {
      const response = await this.axios.get(`/movie/${id}`);
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  async searchMovie({ keyword, page }) {
    try {
      const response = await this.axios.get(
        `/search/movie?query=${keyword}&page=${page}`
      );
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }
}
