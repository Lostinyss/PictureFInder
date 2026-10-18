import { useCallback, useEffect, useState } from "react";
import type {
  QueryResult,
  SearchParams,
  SearchResponse,
} from "../types/image";
import { ApiError } from "../types/image";
import { searchImages } from "../api/openverse";

export function useImageSearch(
  params: SearchParams
): QueryResult<SearchResponse> {
  const [data, setData] = useState<SearchResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchImages = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const result = await searchImages(params);
      setData(result);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err
          : new ApiError(500, "Failed to search images")
      );
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [params]);

  useEffect(() => {
    setIsLoading(true);
    void fetchImages();
  }, [fetchImages]);

  return {
    data,
    isLoading,
    isFetching,
    isError: error !== null,
    error,
    refetch: fetchImages,
  };
}