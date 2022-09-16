import { StyleSheet, View } from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { BottomHalfView, TopHalfView } from "../components/MovieDetailScreen";
import { MoviesService } from "../api";
import { useEffect, useState } from "react";
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
        <TopHalfView
          uri={
            movieDetail.poster_path
              ? `${IMAGE_BASE_URL}/original/${movieDetail.poster_path}`
              : null
          }
          vote_average={movieDetail.vote_average}
          vote_count={movieDetail.vote_count}
          release_date={movieDetail.release_date}
          title={movieDetail.title}
        />

        <BottomHalfView
          genres={movieDetail.genres}
          overview={movieDetail.overview}
        />
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
