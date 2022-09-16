import { Text } from "@rneui/themed";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { FontAwesome } from "@expo/vector-icons";
import { useSearchMovies } from "../../hooks";
import { RenderIf } from "../common";

export const PopularMoviesHorizontalList = ({ movies, navigation }) => {
  const { loadMore, isLoading } = useSearchMovies();
  return (
    <View style={{ flexDirection: "row" }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.flatListContainer}
              onPress={() =>
                navigation.navigate("MovieDetail", {
                  movieId: item.id,
                  //These two last params are especially for FavoriteContext
                  movieTitle: item.title,
                  moviePoster: item.poster_path,
                })
              }
            >
              {item.poster_path ? (
                <Image
                  style={styles.imageOrIcon}
                  resizeMode="stretch"
                  source={{
                    uri: `${IMAGE_BASE_URL}/original/${item.poster_path}`,
                  }}
                />
              ) : (
                <FontAwesome
                  name="file-movie-o"
                  color="black"
                  size={185}
                  style={styles.imageOrIcon}
                  adjustsFontSizeToFit={true}
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        onEndReached={loadMore}
      />
      <RenderIf condition={isLoading}>
        <ActivityIndicator size={50} color="#00ff00" style={styles.indicator} />
      </RenderIf>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "column",
    marginTop: 10,
    width: 160,
    marginHorizontal: 10,
  },
  imageOrIcon: {
    height: 185,
    width: 160,
    marginBottom: 5,
  },
  title: {
    alignSelf: "center",
    fontWeight: "700",
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    height: 185,
  },
});
