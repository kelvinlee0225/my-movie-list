import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useContext } from "react";
import { MoviesContext } from "../../contexts";
import { sortOptions } from "../../constants";

export const Header = ({ navigation }) => {
  const { selectedSortBy, setSelectedSortBy } = useContext(MoviesContext);

  const selectedTextSyleHandler = (value) => {
    switch (value) {
      case "vote_average.desc":
        return { ...styles.selectedTextStyle, fontSize: 11 };
      case "vote_average.asc":
        return { ...styles.selectedTextStyle, fontSize: 11 };
      case "original_title.desc":
        return { ...styles.selectedTextStyle, fontSize: 14 };
      case "original_title.asc":
        return { ...styles.selectedTextStyle, fontSize: 14 };
      default:
        return styles.selectedTextStyle;
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate("Search")}
      >
        <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={selectedTextSyleHandler(selectedSortBy)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    flex: 7,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "flex-start",
  },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    flex: 3,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdownIconStyle: {
    width: 20,
    height: 20,
  },
});
