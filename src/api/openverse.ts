
import type {
  ImageSummary,
  SearchParams,
  SearchResponse,
} from "../types/image";
import { ApiError } from "../types/image";

export async function searchImages(
  params: SearchParams
): Promise<SearchResponse> {
  const url = new URL("https://api.openverse.org/v1/images/");

  url.searchParams.set("q", params.q);
  url.searchParams.set("page", String(params.page));
  url.searchParams.set("page_size", "12");

  if (params.license_type) {
    url.searchParams.set("license_type", params.license_type);
  }

  if (params.license) {
    url.searchParams.set("license", params.license);
  }

  if (params.aspect_ratio) {
    url.searchParams.set("aspect_ratio", params.aspect_ratio);
  }

  if (params.size) {
    url.searchParams.set("size", params.size);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(response.status, "Openverse API request failed");
  }

  return response.json();
}



export async function getImage(id: string): Promise<ImageSummary> {
  const url = `https://api.openverse.org/v1/images/${encodeURIComponent(id)}/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Failed to fetch image details"
    );
  }

  return response.json();
}

