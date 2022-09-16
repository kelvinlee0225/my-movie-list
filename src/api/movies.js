import axios from "axios";
import { API_KEY } from "@env";
import moment from "moment";

export class MoviesService {
  axios = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  async getMoviesByRating() {
    try {
      const endDate = moment(new Date()).format("YYYY-MM-DD");
      const startDate = moment(startDate).subtract(47, "days");
      const response = await this.axios.get(
        `/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=vote_average.desc`
      );
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }
}