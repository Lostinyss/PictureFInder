// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { ImageSummary, QueryResult } from "../types/image";
import { ApiError } from "../types/image";
import { MOCK_IMAGES, MOCK_STATE } from "../mocks/images";

export function useImageDetail(id: string): QueryResult<ImageSummary> {
  const base = { isFetching: false, refetch: () => {} };
  if (MOCK_STATE === "loading") return { ...base, data: undefined, isLoading: true, isError: false, error: null };
  if (MOCK_STATE === "error")   return { ...base, data: undefined, isLoading: false, isError: true, error: new ApiError(500, "server error") };

  const image = MOCK_IMAGES.find((img) => img.id === id);
  if (!image || MOCK_STATE === "empty") {
    return { ...base, data: undefined, isLoading: false, isError: true, error: new ApiError(404, "not found") };
  }

  return { ...base, data: image, isLoading: false, isError: false, error: null };
}
