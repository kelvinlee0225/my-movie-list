import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "../components/common";
import { LinearGradient } from "expo-linear-gradient";
import { MoviesService } from "../api";
import { Text } from "@rneui/themed";
import { RenderIf } from "../components";
import { IMAGE_BASE_URL } from "@env";

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
        <FlatList
          data={fetchedMovies}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate("MovieDetail", { movieId: item.id })
                }
              >
                <Image
                  source={{
                    uri: `${IMAGE_BASE_URL}/original/${item.poster_path}`,
                  }}
                  style={styles.image}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={() => <View style={{ height: 20 }} />}
        />
      </RenderIf>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: "center",
  },
  itemContainer: {
    padding: 8,
    width: 180,
  },
  image: {
    height: 185,
    width: 160,
  },
  movieTitle: {
    alignSelf: "center",
    fontSize: 16,
  },
});
