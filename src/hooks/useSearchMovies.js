import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MoviesService } from "../api";

export const useSearchMovies = () => {
  const movieService = new MoviesService();

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["popularMovies"],
    ({ pageParam = 1 }) => movieService.getMoviesByRating({ page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return lastPage.page;
      },
    }
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const items = useMemo(() => {
    if (data && data.pages)
      return data.pages.map((item) => item.results).flat();
    return [];
  }, [data]);

  return { isLoading, data: items, loadMore };
};
