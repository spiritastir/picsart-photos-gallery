import { useRef } from "react";
import styled from "styled-components";
import { useVirtualizedMasonry } from "../hooks/useVirtualizedMasonry";
import { useScrollHandler } from "../hooks/useScrollHandler";
import { UI_CONFIG } from "../constants";
import type { Photo } from "../types/pexels";

interface MasonryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const GridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 32px 32px;
  box-sizing: border-box;
  background: #fafafa;
`;

const GridContent = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => `${height}px`};
`;

const PhotoItem = styled.div.attrs<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
}>(({ $top, $left, $width, $height }) => ({
  style: {
    top: `${$top}px`,
    left: `${$left}px`,
    width: `${$width}px`,
    height: `${$height}px`,
  },
}))`
  position: absolute;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(34, 34, 34, 0.08);
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 24px rgba(34, 34, 34, 0.16);
    transform: translateY(-2px) scale(1.025);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    background: #f0f0f0;
    display: block;
  }
`;

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  photos,
  onPhotoClick,
}) => {
  const { visibleItems, totalHeight, handleScroll } = useVirtualizedMasonry({
    items: photos,
    itemWidth: UI_CONFIG.ITEM_WIDTH,
    containerWidth: window.innerWidth,
    containerHeight: window.innerHeight,
    itemGap: UI_CONFIG.ITEM_GAP,
  });

  // Store the latest handleScroll function in a ref to prevent recreation issues
  const handleScrollRef = useRef(handleScroll);
  handleScrollRef.current = handleScroll;

  // Use the custom scroll handler hook
  useScrollHandler({
    onScroll: (scrollY, winHeight) =>
      handleScrollRef.current(scrollY, winHeight),
    debounceMs: UI_CONFIG.SCROLL_DEBOUNCE_MS,
    threshold: UI_CONFIG.SCROLL_THRESHOLD_PX,
  });

  return (
    <GridContainer>
      <GridContent height={totalHeight}>
        {visibleItems.map(({ item, top, left, width, height }) => (
          <PhotoItem
            key={item.id}
            $top={top}
            $left={left}
            $width={width}
            $height={height}
            onClick={() => onPhotoClick(item)}
          >
            <img src={item.src.medium} alt={item.alt} loading="lazy" />
          </PhotoItem>
        ))}
      </GridContent>
    </GridContainer>
  );
};
