import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MasonryGrid } from "../MasonryGrid";
import type { Photo } from "../../types/pexels";

const mockPhotos: Photo[] = [
  {
    id: 1,
    width: 1000,
    height: 800,
    url: "https://example.com/photo1",
    photographer: "John Doe",
    photographer_url: "https://example.com/photographer1",
    photographer_id: 1,
    avg_color: "#000000",
    src: {
      original: "https://example.com/photo1/original",
      large2x: "https://example.com/photo1/large2x",
      large: "https://example.com/photo1/large",
      medium: "https://example.com/photo1/medium",
      small: "https://example.com/photo1/small",
      portrait: "https://example.com/photo1/portrait",
      landscape: "https://example.com/photo1/landscape",
      tiny: "https://example.com/photo1/tiny",
    },
    liked: false,
    alt: "Test Photo 1",
  },
  {
    id: 2,
    width: 1200,
    height: 900,
    url: "https://example.com/photo2",
    photographer: "Jane Smith",
    photographer_url: "https://example.com/photographer2",
    photographer_id: 2,
    avg_color: "#ffffff",
    src: {
      original: "https://example.com/photo2/original",
      large2x: "https://example.com/photo2/large2x",
      large: "https://example.com/photo2/large",
      medium: "https://example.com/photo2/medium",
      small: "https://example.com/photo2/small",
      portrait: "https://example.com/photo2/portrait",
      landscape: "https://example.com/photo2/landscape",
      tiny: "https://example.com/photo2/tiny",
    },
    liked: false,
    alt: "Test Photo 2",
  },
];

// Mock getBoundingClientRect and clientWidth/clientHeight for the container
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    value: 1000,
  });
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    value: 1000,
  });
});

describe("MasonryGrid", () => {
  it("renders photos in the grid", () => {
    const handlePhotoClick = vi.fn();
    render(<MasonryGrid photos={mockPhotos} onPhotoClick={handlePhotoClick} />);

    const photoElements = screen.getAllByRole("img");
    expect(photoElements).toHaveLength(mockPhotos.length);

    photoElements.forEach((element, index) => {
      expect(element).toHaveAttribute("src", mockPhotos[index].src.medium);
      expect(element).toHaveAttribute("alt", mockPhotos[index].alt);
    });
  });

  it("calls onPhotoClick when a photo is clicked", () => {
    const handlePhotoClick = vi.fn();
    render(<MasonryGrid photos={mockPhotos} onPhotoClick={handlePhotoClick} />);

    const photoElements = screen.getAllByRole("img");
    photoElements[0].click();

    expect(handlePhotoClick).toHaveBeenCalledWith(mockPhotos[0]);
  });
});
