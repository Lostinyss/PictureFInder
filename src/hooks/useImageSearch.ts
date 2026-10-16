// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { QueryResult, SearchParams, SearchResponse } from "../types/image";
import { ApiError } from "../types/image";
import { MOCK_IMAGES, MOCK_STATE } from "../mocks/images";

export function useImageSearch(params: SearchParams): QueryResult<SearchResponse> {
  void params;
  const base = { isFetching: false, refetch: () => {} };
  if (MOCK_STATE === "loading") return { ...base, data: undefined, isLoading: true, isError: false, error: null };
  if (MOCK_STATE === "error")   return { ...base, data: undefined, isLoading: false, isError: true, error: new ApiError(429, "rate limit") };
  const results = MOCK_STATE === "empty" ? [] : MOCK_IMAGES.slice(0, 20);
  return {
    ...base,
    data: { result_count: results.length * 5, page_count: 5, page: params.page, results },
    isLoading: false,
    isError: false,
    error: null,
  };
}
