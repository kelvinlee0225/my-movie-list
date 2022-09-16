import { FlatList, StyleSheet, View } from "react-native";
import { RenderIf } from "../RenderIf";
import { Text, Button } from "@rneui/themed";

export const BottomHalfView = ({ genres, overview }) => {
  return (
    <View style={styles.container}>
      <RenderIf condition={genres && genres.length > 0}>
        <Text style={styles.detailsSubTitle}>Genres</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={genres}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Button title={item.name} radius="100" size="md" />
              </View>
            );
          }}
        />
      </RenderIf>

      <View style={styles.synopsisContainer}>
        <Text style={styles.detailsSubTitle}>Synopsis</Text>
        <Text style={styles.overViewText}>{overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  detailsSubTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  itemContainer: { marginHorizontal: 5, flex: 1 },
  synopsisContainer: {
    flex: 9,
  },
  overViewText: {
    marginTop: 15,
  },
});
