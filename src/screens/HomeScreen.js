import { useEffect, useState } from "react";
import { MoviesService } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MainTouchableImage,
  PopularMoviesHeader,
  PopularMoviesHorizontalList,
  RenderIf,
} from "../components";
import { StyleSheet, View } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const movieService = new MoviesService();
  const [movies, setMovies] = useState([]);
  const [firstMovieWithPoster, setFirstMovieWithPoster] = useState({});

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
    <SafeAreaView>
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
  popularMoviesContainer: {
    marginTop: 10,
  },
});
