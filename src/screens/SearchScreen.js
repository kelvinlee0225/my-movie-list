import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { MoviesGridList, SearchBar } from "../components/common";
import { LinearGradient } from "expo-linear-gradient";
import { MoviesService } from "../api";
import { RenderIf } from "../components/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const SearchScreen = ({ navigation }) => {
  const movieService = new MoviesService();
  const [searchTerm, setSearchTerm] = useState("");
  const [onTermSubmitted, setOnTermSubmitted] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["popular-movies", { searchTerm, onTermSubmitted }],
    ({ pageParam = 1 }) => {
      return movieService.searchMovie({ keyword: searchTerm, page: pageParam });
    },
    {
      enabled: onTermSubmitted,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return lastPage.page;
      },
    }
  );
  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const fetchedMovies = useMemo(() => {
    if (data && data.pages)
      return data.pages.map((item) => item.results).flat();
    return [];
  }, [data]);

  return (
    <LinearGradient colors={["#00416A", "#E4E5E6"]} style={styles.background}>
      <SearchBar
        term={searchTerm}
        onTermChange={(text) => {
          setSearchTerm(text);
          if (onTermSubmitted) setOnTermSubmitted(false);
        }}
        onTermSubmitted={() => {
          setOnTermSubmitted(true);
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
});
