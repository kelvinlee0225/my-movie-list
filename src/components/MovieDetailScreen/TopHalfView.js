import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { MoviePoster } from "./MoviePoster";
import { DetailLabelsList } from "./DetailLabelsList";

export const TopHalfView = ({
  uri,
  vote_average,
  vote_count,
  release_date,
  title,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.posterAndDetails}>
        <MoviePoster imageUri={uri} />
        <DetailLabelsList
          vote_average={vote_average}
          vote_count={vote_count}
          release_date={release_date}
        />
      </View>
      <Text h2 style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posterAndDetails: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    alignSelf: "center",
  },
});
