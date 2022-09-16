import { Image, StyleSheet, View } from "react-native";

export const MoviePoster = ({ imageUri }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUri }}
        resizeMode="stretch"
        style={{ height: "90%", width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "60%",
    justifyContent: "center",
  },
});
