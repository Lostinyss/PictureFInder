import { useQuery } from "@tanstack/react-query";
import type { QueryResult, SearchParams, SearchResponse } from "../types/image";
import { ApiError } from "../types/image";
import { searchImages } from "../api/openverse";

export function useImageSearch(params: SearchParams): QueryResult<SearchResponse> {
  const query = useQuery<SearchResponse, ApiError>({
    queryKey: ["images", params],
    queryFn: ({ signal }) => searchImages(params, signal),
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: () => { void query.refetch(); },
  };
}
