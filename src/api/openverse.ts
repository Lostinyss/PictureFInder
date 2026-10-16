// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { ImageSummary, SearchParams, SearchResponse } from "../types/image";

export async function searchImages(params: SearchParams): Promise<SearchResponse> {
  void params;
  throw new Error("TODO");
}

export async function getImage(id: string): Promise<ImageSummary> {
  void id;
  throw new Error("TODO");
}

export async function getRelated(id: string): Promise<SearchResponse> {
  void id;
  throw new Error("TODO");
}
