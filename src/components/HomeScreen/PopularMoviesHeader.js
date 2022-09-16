import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";

export const PopularMoviesHeader = ({ title, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.headerContainer}
      onPress={() => navigation.navigate("PopularMoviesGrid")}
    >
      <Text h4 style={styles.title}>
        {title}
      </Text>
      <AntDesign name="right" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
    marginLeft: 10,
  },
  title: {
    color: "white",
  },
});
