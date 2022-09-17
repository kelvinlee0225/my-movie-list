import { MoviesGridList, RenderIf } from "../components/common";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { MoviesContext } from "../contexts";

export const PopularMoviesGridScreen = ({ navigation }) => {
  const { fetchedMovies, loadMore, isFetching } = useContext(MoviesContext);
  return (
    <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
      <Text h2 style={styles.title}>
        Popular Movies in Theaters
      </Text>
      <RenderIf condition={fetchedMovies.length > 0}>
        <MoviesGridList
          fetchedMovies={fetchedMovies}
          navigation={navigation}
          loadMore={loadMore}
          isFetching={isFetching}
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
