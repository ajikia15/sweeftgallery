import { useContext } from "react";
import { usePhotos } from "../services/queries";
import { SearchContext } from "../context";
import Card from "../reusable/Card";

export default function Home() {
  const { debouncedSearch } = useContext(SearchContext);

  const photosQuery = usePhotos({ query: debouncedSearch || "cats", page: 1 });

  if (photosQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (photosQuery.isError) {
    return <div>Error: {photosQuery.error.message}</div>;
  }

  return (
    <div>
      <div className="w-full columns-1 md:columns-2 mx-auto max-w-[1200px] lg:columns-3 xl:columns-4 gap-5 md:gap-7 lg:gap-9 xl:gap-10 space-y-5 md:space-y-7 lg:space-y-9 xl:space-y-10">
        {photosQuery.data.results.map((photo: any) => (
          <Card key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
