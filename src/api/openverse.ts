
import type {
  ImageSummary,
  SearchParams,
  SearchResponse,
} from "../types/image";
import { ApiError } from "../types/image";

async function requestOpenverse<T>(url: URL, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ApiError(0, "Unable to connect to Openverse");
  }

  if (!response.ok) {
    throw new ApiError(response.status, "Openverse API request failed");
  }

  return response.json() as Promise<T>;
}

export async function searchImages(
  params: SearchParams,
  signal?: AbortSignal
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

  return requestOpenverse<SearchResponse>(url, signal);
}

export async function getImage(id: string, signal?: AbortSignal): Promise<ImageSummary> {
  const url = new URL(`https://api.openverse.org/v1/images/${encodeURIComponent(id)}/`);

  return requestOpenverse<ImageSummary>(url, signal);
}

