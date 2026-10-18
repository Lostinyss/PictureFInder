import { useCallback, useEffect, useState } from "react";
import type {
  ImageSummary,
  QueryResult,
} from "../types/image";
import { ApiError } from "../types/image";
import { getImage } from "../api/openverse";

export function useImageDetail(
  id: string
): QueryResult<ImageSummary> {
  const [data, setData] = useState<ImageSummary>();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchImage = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const result = await getImage(id);
      setData(result);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err
          : new ApiError(500, "Failed to fetch image")
      );
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    void fetchImage();
  }, [fetchImage]);

  return {
    data,
    isLoading,
    isFetching,
    isError: error !== null,
    error,
    refetch: fetchImage,
  };
}