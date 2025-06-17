import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PhotoDetail } from "../PhotoDetail";
import type { Photo } from "../../types/pexels";

const mockPhoto: Photo = {
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
};

describe("PhotoDetail", () => {
  it("renders photo details correctly", () => {
    const handleBack = vi.fn();
    render(<PhotoDetail photo={mockPhoto} onBack={handleBack} />);

    // Check if the photo is rendered
    const photoElement = screen.getByRole("img");
    expect(photoElement).toHaveAttribute("src", mockPhoto.src.large2x);
    expect(photoElement).toHaveAttribute("alt", mockPhoto.alt);

    // Check if photographer information is displayed
    expect(screen.getByText(mockPhoto.photographer)).toBeInTheDocument();
    expect(
      screen.getByText(`Dimensions: ${mockPhoto.width} x ${mockPhoto.height}`)
    ).toBeInTheDocument();

    // Check if back button is present
    const backButton = screen.getByText("← Back to Grid");
    expect(backButton).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", () => {
    const handleBack = vi.fn();
    render(<PhotoDetail photo={mockPhoto} onBack={handleBack} />);

    const backButton = screen.getByText("← Back to Grid");
    backButton.click();

    expect(handleBack).toHaveBeenCalled();
  });
});
