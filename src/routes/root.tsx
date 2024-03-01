import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { SearchContext } from "../context";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function Root() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  return (
    <SearchContext.Provider value={{ search, setSearch, debouncedSearch }}>
      <Navbar />
      <Outlet />
    </SearchContext.Provider>
  );
}
