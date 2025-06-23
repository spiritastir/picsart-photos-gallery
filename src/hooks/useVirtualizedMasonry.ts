import { useState, useEffect, useCallback, useRef } from "react";
import { UI_CONFIG } from "../constants";
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
  itemGap,
}: UseVirtualizedMasonryProps) => {
  const [columns, setColumns] = useState<number>(0);
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [visibleItems, setVisibleItems] = useState<MasonryItem[]>([]);

  // Track previous visible items for debugging
  const prevVisibleItemsRef = useRef<MasonryItem[]>([]);

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
  const calculateLayout = useCallback(
    (scrollY: number, winHeight: number) => {
      if (columns === 0) return;

      const newColumnHeights = new Array(columns).fill(0);
      const newVisibleItems: MasonryItem[] = [];

      // Calculate viewport bounds with overscan
      const viewportTop = scrollY - UI_CONFIG.OVERSCAN_PX;
      const viewportBottom = scrollY + winHeight + UI_CONFIG.OVERSCAN_PX;

      let renderedCount = 0;

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
        const bottom = top + itemHeight;

        // Update column height
        newColumnHeights[shortestColumnIndex] += itemHeight + itemGap;

        // Only add items that are within the viewport plus overscan buffer
        // Improved visibility check: item must intersect with viewport
        if (bottom >= viewportTop && top <= viewportBottom) {
          newVisibleItems.push({
            item,
            top,
            left,
            width: itemWidth,
            height: itemHeight,
          });
          renderedCount++;
        }
      });

      // Check if visible items actually changed
      const itemsChanged =
        newVisibleItems.length !== prevVisibleItemsRef.current.length ||
        newVisibleItems.some(
          (item, index) =>
            prevVisibleItemsRef.current[index]?.item.id !== item.item.id
        );

      if (itemsChanged) {
        console.log(
          `[Virtualization] Calculation triggered - Rendering ${newVisibleItems.length} items (scrollY: ${scrollY})`
        );
        prevVisibleItemsRef.current = newVisibleItems;
      }

      setColumnHeights(newColumnHeights);
      setVisibleItems(newVisibleItems);
    },
    [items, columns, itemWidth, itemGap]
  );

  // Handle scroll events (window-based)
  const handleScroll = useCallback(
    (scrollY: number, winHeight: number) => {
      calculateLayout(scrollY, winHeight);
    },
    [calculateLayout]
  );

  // Recalculate layout when dependencies change
  useEffect(() => {
    handleScroll(window.scrollY, window.innerHeight);
    // eslint-disable-next-line
  }, [calculateLayout, items]);

  return {
    visibleItems,
    totalHeight: Math.max(...columnHeights),
    handleScroll,
  };
};
