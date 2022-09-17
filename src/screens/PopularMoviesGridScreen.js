import { MoviesGridList, RenderIf } from "../components/common";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { MoviesContext } from "../contexts";
import { Dropdown } from "react-native-element-dropdown";
import { sortOptions } from "../constants";

export const PopularMoviesGridScreen = ({ navigation }) => {
  const {
    fetchedMovies,
    loadMore,
    isFetching,
    selectedSortBy,
    setSelectedSortBy,
  } = useContext(MoviesContext);
  return (
    <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
      <Text h2 style={styles.title}>
        Popular Movies in Theaters
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.dropdownIconStyle}
        data={sortOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Sort By"
        value={selectedSortBy}
        onChange={(item) => {
          setSelectedSortBy(item.value);
        }}
      />

      <RenderIf condition={fetchedMovies.length > 0}>
        <MoviesGridList
          fetchedMovies={fetchedMovies}
          navigation={navigation}
          loadMore={loadMore}
          isFetching={isFetching}
        />
      </RenderIf>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  title: { color: "white", textAlign: "center", marginVertical: 20 },
  dropdown: {
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
    width: "80%",
  },
  placeholderStyle: {
    fontSize: 25,
  },
  selectedTextStyle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  dropdownIconStyle: {
    width: 25,
    height: 25,
  },
});
