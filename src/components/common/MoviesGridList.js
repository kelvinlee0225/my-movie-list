import { FlatList, Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { Text } from "@rneui/themed";

export const MoviesGridList = ({ fetchedMovies, navigation }) => {
  return (
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
    image: {
      height: 185,
      width: 160,
    },
    movieTitle: {
      alignSelf: "center",
      fontSize: 16,
    },
  });