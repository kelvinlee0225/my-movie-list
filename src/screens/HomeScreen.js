import { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PopularMoviesHeader,
  PopularMoviesHorizontalList,
} from "../components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FavoriteContext } from "../contexts";
import { useSearchMovies } from "../hooks";

export const HomeScreen = ({ navigation }) => {
  const [firstMovieWithPoster, setFirstMovieWithPoster] = useState({});
  const { favoriteMovies } = useContext(FavoriteContext);
  const { data: fetchedMovies } = useSearchMovies();

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
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <Feather name="search" style={styles.iconStyle} />
        </TouchableOpacity>

        <View style={styles.popularMoviesContainer}>
          <PopularMoviesHeader
            title="Popular Movies in Theaters"
            navigation={navigation}
          />
          <PopularMoviesHorizontalList
            movies={fetchedMovies}
            navigation={navigation}
          />
        </View>

        <View style={styles.popularMoviesContainer}>
          <PopularMoviesHeader title="Your Favorites" />
          <PopularMoviesHorizontalList
            movies={memoizedFavoriteMovies}
            navigation={navigation}
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
