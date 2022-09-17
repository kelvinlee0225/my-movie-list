import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { createContext } from "react";
import { MoviesService } from "../api";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [selectedSortBy, setSelectedSortBy] = useState("vote_average.desc");
  const movieService = new MoviesService();

  const { data, refetch, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      ["popular-movies", { selectedSortBy }],
      ({ pageParam = 1 }) => {
        return movieService.getMovies({
          page: pageParam,
          sortBy: selectedSortBy,
        });
      },
      {
        enabled: true,
        getNextPageParam: (lastPage) => {
          if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
          return lastPage.page;
        },
      }
    );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  //   const refetchMovies = () => {
  //     queryClient.clear();
  //     refetch({ refetchPage: (page, index) => index === 0 });
  //   };

  const items = useMemo(() => {
    if (data && data.pages)
      return data.pages.map((item) => item.results).flat();
    return [];
  }, [data]);

  return (
    <MoviesContext.Provider
      value={{
        fetchedMovies: items,
        loadMore,
        isFetching,
        selectedSortBy,
        setSelectedSortBy,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
