import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useVirtualizedMasonry } from "../hooks/useVirtualizedMasonry";
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
  padding: 32px 32px 32px 32px;
  box-sizing: border-box;
  background: #fafafa;
`;

const GridContent = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => `${height}px`};
`;

const PhotoItem = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
}>`
  position: absolute;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const ITEM_WIDTH = 300;
  const ITEM_GAP = 20;

  const { visibleItems, totalHeight, handleScroll } = useVirtualizedMasonry({
    items: photos,
    itemWidth: ITEM_WIDTH,
    containerWidth,
    containerHeight,
    itemGap: ITEM_GAP,
  });

  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateContainerDimensions();
    window.addEventListener("resize", updateContainerDimensions);

    return () => {
      window.removeEventListener("resize", updateContainerDimensions);
    };
  }, []);

  const handleContainerScroll = () => {
    if (containerRef.current) {
      handleScroll(containerRef.current.scrollTop);
    }
  };

  return (
    <GridContainer ref={containerRef} onScroll={handleContainerScroll}>
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
