import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useContext } from "react";
import { MoviesContext } from "../../contexts";

const options = [
  { label: "Rating DESC", value: "vote_average.desc" },
  { label: "Rating ASC", value: "vote_average.asc" },
  { label: "Name Z-A", value: "original_title.desc" },
  { label: "Name A-Z", value: "original_title.asc" },
  { label: "Year of Release DESC", value: "primary_release_date.desc" },
  { label: "Year of Release ASC", value: "primary_release_date.asc" },
];

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
        data={options}
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
  icon: {
    marginRight: 5,
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
