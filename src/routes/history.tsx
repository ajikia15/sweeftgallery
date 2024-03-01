import { useContext } from "react";
import { SearchContext } from "../context";

export default function History() {
  const { searchHistory } = useContext(SearchContext);
  return (
    <div>
      <h1>history :</h1>
      <div>
        {searchHistory.map((search) =>
          search !== "" ? <div key={search}>{search}</div> : null
        )}
      </div>
    </div>
  );
}
