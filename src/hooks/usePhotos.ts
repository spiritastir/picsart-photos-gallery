import { useState, useEffect, useCallback } from "react";
import { getPhotos, searchPhotos } from "../services/pexelsApi";
import { API_CONFIG } from "../constants";
import type { Photo } from "../types/pexels";

export const usePhotos = (searchQuery: string = "") => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = useCallback(
    async (pageNum: number, isSearch: boolean = false) => {
      try {
        setError(null);
        const response = isSearch
          ? await searchPhotos(searchQuery, pageNum, API_CONFIG.PHOTOS_PER_PAGE)
          : await getPhotos(pageNum, API_CONFIG.PHOTOS_PER_PAGE);

        const newPhotos = response.photos;
        const totalResults = response.total_results;
        const currentTotal =
          (pageNum - 1) * API_CONFIG.PHOTOS_PER_PAGE + newPhotos.length;

        setHasMore(currentTotal < totalResults);

        if (pageNum === 1) {
          setPhotos(newPhotos);
        } else {
          setPhotos((prev) => [...prev, ...newPhotos]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch photos");
      }
    },
    [searchQuery]
  );

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    await fetchPhotos(nextPage, !!searchQuery);
    setLoadingMore(false);
  }, [loadingMore, hasMore, page, fetchPhotos, searchQuery]);

  // Reset and fetch new photos when search query changes
  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);

    fetchPhotos(1, !!searchQuery).finally(() => {
      setLoading(false);
    });
  }, [searchQuery, fetchPhotos]);

  return {
    photos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
};
