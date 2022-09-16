import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { DetailLabel } from "./DetailLabel";

export const DetailLabelsList = ({
  vote_average,
  vote_count,
  release_date,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <DetailLabel title="Score" content={vote_average} />
        <DetailLabel title="Vote Count" content={vote_count} />
        <DetailLabel title="Release Date" content={release_date} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});
