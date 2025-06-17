import axios from "axios";
import type { PexelsResponse } from "../types/pexels";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = "https://api.pexels.com/v1";

const pexelsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: PEXELS_API_KEY,
  },
});

export const getPhotos = async (
  page: number = 1,
  perPage: number = 20
): Promise<PexelsResponse> => {
  try {
    const response = await pexelsApi.get("/curated", {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const searchPhotos = async (
  query: string,
  page: number = 1,
  perPage: number = 20
): Promise<PexelsResponse> => {
  try {
    const response = await pexelsApi.get("/search", {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching photos:", error);
    throw error;
  }
};
