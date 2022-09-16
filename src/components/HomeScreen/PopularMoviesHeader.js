import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";

export const PopularMoviesHeader = ({ title }) => {
  return (
    <TouchableOpacity style={styles.headerContainer}>
      <Text h4 style={{ fontFamily: "Bebas Neue" }}>
        {title}
      </Text>
      <AntDesign name="right" size={24} color="black" />
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
});
