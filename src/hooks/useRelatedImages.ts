// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { QueryResult, SearchResponse } from "../types/image";
import { ApiError } from "../types/image";
import { MOCK_IMAGES, MOCK_STATE } from "../mocks/images";

export function useRelatedImages(id: string): QueryResult<SearchResponse> {
  const base = { isFetching: false, refetch: () => {} };
  if (MOCK_STATE === "loading") return { ...base, data: undefined, isLoading: true, isError: false, error: null };
  if (MOCK_STATE === "error")   return { ...base, data: undefined, isLoading: false, isError: true, error: new ApiError(500, "server error") };

  const filtered = MOCK_IMAGES.filter((img) => img.id !== id);
  const results = MOCK_STATE === "empty" ? [] : filtered.slice(0, 10);
  return {
    ...base,
    data: { result_count: results.length, page_count: 1, page: 1, results },
    isLoading: false,
    isError: false,
    error: null,
  };
}
