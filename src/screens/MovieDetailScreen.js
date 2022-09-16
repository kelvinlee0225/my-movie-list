import { FlatList, StyleSheet, View } from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { MoviePoster, DetailLabelList } from "../components/MovieDetailScreen";
import { Text, Button } from "@rneui/themed";
import { MoviesService } from "../api";
import { useEffect, useState } from "react";
import { RenderIf } from "../components";
import { LinearGradient } from "expo-linear-gradient";

export const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const movieService = new MoviesService();
  const [movieDetail, setMovieDetail] = useState({});

  const getSpecificMovieDetail = async () => {
    const movie = await movieService.getMovieDetail(movieId);
    setMovieDetail(movie);
  };

  useEffect(() => {
    getSpecificMovieDetail();
  }, []);

  return (
    <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <MoviePoster
              imageUri={
                movieDetail.poster_path
                  ? `${IMAGE_BASE_URL}/original/${movieDetail.poster_path}`
                  : null
              }
            />
            <DetailLabelList
              vote_average={movieDetail.vote_average}
              vote_count={movieDetail.vote_count}
              release_date={movieDetail.release_date}
            />
          </View>
          <Text h2 style={{ alignSelf: "center" }}>
            {movieDetail.title}
          </Text>
        </View>
        <View style={{ flex: 1, paddingTop: 25 }}>
          <RenderIf
            condition={movieDetail.genres && movieDetail.genres.length > 0}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Genres</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={movieDetail.genres}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginHorizontal: 5, flex: 1 }}>
                    <Button title={item.name} radius="100" size="md" />
                  </View>
                );
              }}
            />
          </RenderIf>

          <View style={{ flex: 9 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Synopsis</Text>
            <Text style={{ marginTop: 15 }}>{movieDetail.overview}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
