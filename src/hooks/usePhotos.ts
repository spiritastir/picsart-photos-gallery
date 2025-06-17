import { useState, useEffect } from "react";
import { getPhotos, searchPhotos } from "../services/pexelsApi";
import type { Photo } from "../types/pexels";

export function usePhotos(searchTerm?: string) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetch = async () => {
      try {
        let res;
        if (searchTerm && searchTerm.trim().length > 0) {
          res = await searchPhotos(searchTerm);
        } else {
          res = await getPhotos();
        }
        setPhotos(res.photos);
      } catch {
        setError("Failed to load photos.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [searchTerm]);

  return { photos, loading, error };
}
