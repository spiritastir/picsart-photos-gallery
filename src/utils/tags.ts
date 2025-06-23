/**
 * Extracts tags from photo alt text
 * @param alt - The alt text from the photo
 * @returns Array of cleaned tags
 */
export const extractTags = (alt: string): string[] => {
  if (!alt) return [];

  return alt.includes(",")
    ? alt
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : alt
        .split(" ")
        .map((tag) => tag.trim())
        .filter(Boolean);
};
