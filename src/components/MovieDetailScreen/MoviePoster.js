import { Image, StyleSheet, View } from "react-native";
import { RenderIf } from "../common";
import { FontAwesome } from "@expo/vector-icons";

export const MoviePoster = ({ imageUri }) => {
  return (
    <View style={styles.imageContainer}>
      <RenderIf condition={!!imageUri}>
        <Image
          source={{ uri: imageUri }}
          resizeMode="stretch"
          style={{ height: "90%", width: "100%" }}
        />
      </RenderIf>

      <RenderIf condition={!imageUri}>
        <FontAwesome
          name="file-movie-o"
          color="black"
          size={185}
          style={styles.imageOrIcon}
          adjustsFontSizeToFit={true}
        />
      </RenderIf>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "60%",
    justifyContent: "center",
  },
  imageOrIcon: {
    height: 185,
    width: 160,
    marginBottom: 5,
  },
});
