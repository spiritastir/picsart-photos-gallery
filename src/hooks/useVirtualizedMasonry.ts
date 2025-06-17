import { useState, useEffect, useCallback, useRef } from "react";
import type { Photo } from "../types/pexels";

interface UseVirtualizedMasonryProps {
  items: Photo[];
  itemWidth: number;
  containerWidth: number;
  containerHeight: number;
  itemGap: number;
}

interface MasonryItem {
  item: Photo;
  top: number;
  left: number;
  width: number;
  height: number;
}

export const useVirtualizedMasonry = ({
  items,
  itemWidth,
  containerWidth,
  containerHeight,
  itemGap,
}: UseVirtualizedMasonryProps) => {
  const [columns, setColumns] = useState<number>(0);
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [visibleItems, setVisibleItems] = useState<MasonryItem[]>([]);
  const scrollTop = useRef(0);

  // Calculate number of columns based on container width
  useEffect(() => {
    const newColumns = Math.max(
      1,
      Math.floor((containerWidth + itemGap) / (itemWidth + itemGap))
    );
    setColumns(newColumns);
    setColumnHeights(new Array(newColumns).fill(0));
  }, [containerWidth, itemWidth, itemGap]);

  // Calculate item positions and heights
  const calculateLayout = useCallback(() => {
    if (columns === 0) return;

    const newColumnHeights = new Array(columns).fill(0);
    const newVisibleItems: MasonryItem[] = [];

    items.forEach((item) => {
      // Find the shortest column
      const shortestColumnIndex = newColumnHeights.indexOf(
        Math.min(...newColumnHeights)
      );

      // Calculate item height maintaining aspect ratio
      const aspectRatio = item.width / item.height;
      const itemHeight = itemWidth / aspectRatio;

      // Calculate item position
      const top = newColumnHeights[shortestColumnIndex];
      const left = shortestColumnIndex * (itemWidth + itemGap);

      // Update column height
      newColumnHeights[shortestColumnIndex] += itemHeight + itemGap;

      // Only add items that are visible in the viewport
      if (
        top + itemHeight >= scrollTop.current &&
        top <= scrollTop.current + containerHeight
      ) {
        newVisibleItems.push({
          item,
          top,
          left,
          width: itemWidth,
          height: itemHeight,
        });
      }
    });

    setColumnHeights(newColumnHeights);
    setVisibleItems(newVisibleItems);
  }, [items, columns, itemWidth, itemGap, containerHeight]);

  // Handle scroll events
  const handleScroll = useCallback(
    (scrollPosition: number) => {
      scrollTop.current = scrollPosition;
      calculateLayout();
    },
    [calculateLayout]
  );

  // Recalculate layout when dependencies change
  useEffect(() => {
    calculateLayout();
  }, [calculateLayout]);

  return {
    visibleItems,
    totalHeight: Math.max(...columnHeights),
    handleScroll,
  };
};
