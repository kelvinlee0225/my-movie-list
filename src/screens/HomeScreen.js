import { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  PopularMoviesHeader,
  PopularMoviesHorizontalList,
} from "../components";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FavoriteContext, MoviesContext } from "../contexts";

export const HomeScreen = ({ navigation }) => {
  const [firstMovieWithPoster, setFirstMovieWithPoster] = useState({});

  const { favoriteMovies } = useContext(FavoriteContext);
  const { fetchedMovies } = useContext(MoviesContext);

  const getFirstMovieWithPoster = (fetchedMovies) => {
    for (let movie of fetchedMovies) {
      if (movie.poster_path) {
        setFirstMovieWithPoster(movie);
        return;
      }
    }
    return false;
  };

  useEffect(() => {
    if (Object.keys(firstMovieWithPoster).length < 1)
      getFirstMovieWithPoster(fetchedMovies);
  }, [fetchedMovies.length]);

  const memoizedFavoriteMovies = useMemo(() => {
    const favMoviesArray = [];
    favoriteMovies.forEach((favoriteMovie) => {
      return favMoviesArray.push({
        id: favoriteMovie.id,
        title: favoriteMovie.title,
        poster_path: favoriteMovie.posterUri,
      });
    });
    return favMoviesArray;
  }, [favoriteMovies.length]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
        <Header navigation={navigation} />

        <View style={styles.popularMoviesContainer}>
          <PopularMoviesHeader
            title="Popular Movies in Theaters"
            navigateTo={() => navigation.navigate("PopularMoviesGrid")}
          />

          <PopularMoviesHorizontalList
            movies={fetchedMovies}
            navigation={navigation}
          />
        </View>

        <View style={styles.popularMoviesContainer}>
          <PopularMoviesHeader
            title="Your Favorites"
            navigateTo={() => navigation.navigate("FavoriteMoviesGrid")}
          />
          <PopularMoviesHorizontalList
            movies={memoizedFavoriteMovies}
            navigation={navigation}
            type="favoriteList"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
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
