import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { IMAGE_BASE_URL } from "@env";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "@rneui/themed";

export const MainTouchableImage = ({ firstMovieWithPoster }) => {
  return (
    <TouchableOpacity style={styles.mainTouchableImage}>
      <Image
        style={{ flex: 1 }}
        resizeMode="stretch"
        source={{
          uri: `${IMAGE_BASE_URL}/original/${firstMovieWithPoster.poster_path}`,
        }}
      />
      <View style={styles.mainImageLabel}>
        <Text h4 style={{ alignSelf: "center" }}>
          {firstMovieWithPoster.title}
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainTouchableImage: {
    width: "100%",
    height: "60%",
  },
  mainImageLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
});
