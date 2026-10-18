import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ImageSummary, QueryResult, SearchResponse } from "../types/image";
import { ApiError } from "../types/image";
import { getImage } from "../api/openverse";

export function useImageDetail(id: string): QueryResult<ImageSummary> {
  const queryClient = useQueryClient();
  const query = useQuery<ImageSummary, ApiError>({
    queryKey: ["image", id],
    queryFn: ({ signal }) => getImage(id, signal),
    enabled: Boolean(id),
    placeholderData: () =>
      queryClient
        .getQueriesData<SearchResponse>({ queryKey: ["images"] })
        .flatMap(([, search]) => search?.results ?? [])
        .find((image) => image.id === id),
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
