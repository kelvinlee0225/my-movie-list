import { useState } from "react";
import { StyleSheet } from "react-native";
import { MoviesGridList, SearchBar } from "../components/common";
import { LinearGradient } from "expo-linear-gradient";
import { MoviesService } from "../api";
import { RenderIf } from "../components/common";

export const SearchScreen = ({ navigation }) => {
  const movieService = new MoviesService();
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedMovies, setFetchedMovies] = useState([]);

  const searchMovieByKeyword = async () => {
    const movies = await movieService.searchMovie(searchTerm);
    setFetchedMovies(movies.results);
  };

  return (
    <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
      <SearchBar
        term={searchTerm}
        onTermChange={setSearchTerm}
        onTermSubmitted={() => {
          searchMovieByKeyword();
        }}
      />
      <RenderIf condition={fetchedMovies.length > 0}>
        <MoviesGridList fetchedMovies={fetchedMovies} navigation={navigation} />
      </RenderIf>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
});
