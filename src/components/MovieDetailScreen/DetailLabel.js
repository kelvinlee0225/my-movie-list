import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

export const DetailLabel = ({ title, content }) => {
  return (
    <View style={styles.labelsContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelsContainer: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
  },
});
