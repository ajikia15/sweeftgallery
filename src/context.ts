import { createContext, Dispatch, SetStateAction } from "react";

type SearchContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  debouncedSearch: string;
  searchHistory: string[];
  deleteHistoryItem: (item: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
  debouncedSearch: "",
  searchHistory: [],
  deleteHistoryItem: () => {},
});
