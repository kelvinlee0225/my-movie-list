import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { useSearchMovies } from "../../hooks";
import { RenderIf } from "./RenderIf";

export const MoviesGridList = ({ fetchedMovies, navigation }) => {
  const { loadMore, isLoading } = useSearchMovies();
  return (
    <View>
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
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
        onEndReached={loadMore}
      />
      <RenderIf condition={isLoading}>
        <ActivityIndicator size={50} color="#00ff00" style={styles.indicator} />
      </RenderIf>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: "center",
  },
  itemContainer: {
    padding: 8,
    width: 180,
  },
  imageOrIcon: {
    height: 185,
    width: 160,
  },
  movieTitle: {
    alignSelf: "center",
    fontSize: 16,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    height: 185,
  },
});
