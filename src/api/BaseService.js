import axios from "axios";
import { API_KEY } from "@env";

export class BaseService {
  axios = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
}
