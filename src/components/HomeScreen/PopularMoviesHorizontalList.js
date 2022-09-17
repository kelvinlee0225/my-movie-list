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
import { FavoriteIcon, RenderIf } from "../common";
import { useContext } from "react";
import { MoviesContext } from "../../contexts";

export const PopularMoviesHorizontalList = ({
  movies,
  navigation,
  type = undefined,
}) => {
  const { loadMore, isFetching } = useContext(MoviesContext);

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
              <View style={styles.movieLabelAndFavIconContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <FavoriteIcon
                  movieId={item.id}
                  movieTitle={item.title}
                  moviePoster={item.poster_path}
                  style={{ justifyContent: "flex-end" }}
                  favoriteIconStyle={styles.favoriteIcon}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        // onEndReachedThreshold={5}
        onEndReached={loadMore}
      />
      <RenderIf condition={isFetching && type !== "favoriteList"}>
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
  movieLabelAndFavIconContainer: {
    flexDirection: "row",
    width: 160,
    minHeight: "auto",
  },
  favoriteIcon: {
    flex: 2,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    height: "100%",
  },
  movieTitle: {
    fontWeight: "700",
    flex: 8,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    height: 185,
  },
});
