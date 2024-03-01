import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { SearchContext } from "../context";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function Root() {
  const [search, setSearch] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    const savedSearchHistory = localStorage.getItem("searchHistory");
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
  }, []);

  useEffect(() => {
    if (debouncedSearch && !searchHistory.includes(debouncedSearch)) {
      setSearchHistory((prevSearchHistory) => {
        const updatedSearchHistory = [...prevSearchHistory, debouncedSearch];

        localStorage.setItem(
          "searchHistory",
          JSON.stringify(updatedSearchHistory)
        );

        return updatedSearchHistory;
      });
    }
  }, [debouncedSearch]);
  return (
    <SearchContext.Provider
      value={{ search, setSearch, debouncedSearch, searchHistory }}
    >
      <Navbar />
      <Outlet />
    </SearchContext.Provider>
  );
}
