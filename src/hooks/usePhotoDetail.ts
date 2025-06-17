import { useState, useEffect } from "react";
import { getPhotos } from "../services/pexelsApi";
import type { Photo } from "../types/pexels";

export function usePhotoDetail(photoId?: string, initialPhoto?: Photo | null) {
  const [photo, setPhoto] = useState<Photo | null>(initialPhoto ?? null);
  const [loading, setLoading] = useState(!initialPhoto);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPhoto) return;
    if (!photoId) return;
    setLoading(true);
    setError(null);
    getPhotos()
      .then((response) => {
        const foundPhoto = response.photos.find(
          (p) => p.id.toString() === photoId
        );
        if (foundPhoto) {
          setPhoto(foundPhoto);
        } else {
          setError("Photo not found");
        }
      })
      .catch(() => {
        setError("Failed to load photo details. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [photoId, initialPhoto]);

  return { photo, loading, error };
}
