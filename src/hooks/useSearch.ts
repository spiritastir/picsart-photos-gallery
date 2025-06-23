import { useState } from "react";
import { useDebounce } from "./useDebounce";

interface UseSearchOptions {
  debounceMs?: number;
  initialValue?: string;
}

export const useSearch = ({
  debounceMs = 500,
  initialValue = "",
}: UseSearchOptions = {}) => {
  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebounce(search, debounceMs);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return {
    search,
    debouncedSearch,
    handleSearchChange,
  };
};
