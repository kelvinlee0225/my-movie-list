import { useEffect, useState } from "react";
import { MoviesService } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MainTouchableImage,
  PopularMoviesHeader,
  PopularMoviesHorizontalList,
  RenderIf,
} from "../components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SearchBar } from "../components/common";
import { Feather } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
  const movieService = new MoviesService();
  const [movies, setMovies] = useState([]);
  const [firstMovieWithPoster, setFirstMovieWithPoster] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const getFirstMovieWithPoster = (fetchedMovies) => {
    for (let movie of fetchedMovies) {
      if (movie.poster_path) {
        setFirstMovieWithPoster(movie);
        return;
      }
    }
    return false;
  };

  const getMovies = async () => {
    const result = await movieService.getMoviesByRating();
    const fetchedMovies = result.results;

    if (fetchedMovies.length > 0) {
      setMovies(fetchedMovies);

      if (Object.keys(firstMovieWithPoster).length < 1)
        getFirstMovieWithPoster(fetchedMovies);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity style={styles.searchBar}>
        <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>

      <View style={styles.popularMoviesContainer}>
        <PopularMoviesHeader title="Popular Movies in Theaters" />
        <PopularMoviesHorizontalList movies={movies} navigation={navigation} />
      </View>

      <View style={styles.popularMoviesContainer}>
        <PopularMoviesHeader title="Favorites" />
        <PopularMoviesHorizontalList movies={movies} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  popularMoviesContainer: {
    marginTop: 10,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "flex-start",
  },
});
