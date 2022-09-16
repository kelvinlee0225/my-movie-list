import { Text } from "@rneui/themed";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { FontAwesome } from "@expo/vector-icons";

export const PopularMoviesHorizontalList = ({ movies }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={movies}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.flatListContainer}>
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
    />
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
});
