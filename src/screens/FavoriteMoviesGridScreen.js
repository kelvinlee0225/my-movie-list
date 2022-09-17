import { MoviesGridList, RenderIf } from "../components/common";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { FavoriteContext } from "../contexts";
import { useContext, useMemo } from "react";

export const FavoriteMoviesGridScreen = ({ navigation }) => {
  const { favoriteMovies } = useContext(FavoriteContext);

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
    <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
      <Text h2 style={styles.title}>
        Your favorites
      </Text>
      <RenderIf condition={favoriteMovies.length > 0}>
        <MoviesGridList
          fetchedMovies={memoizedFavoriteMovies}
          navigation={navigation}
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
  title: { color: "white", textAlign: "center", marginVertical: 20 },
});
