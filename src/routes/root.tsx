import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { SearchContext } from "../context";
import { useState } from "react";

export default function Root() {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <Navbar />
      <Outlet />
    </SearchContext.Provider>
  );
}
