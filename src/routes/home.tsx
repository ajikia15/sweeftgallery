import { usePhotos } from "../services/queries";

export default function Home() {
  const photosQuery = usePhotos({ query: "cats", page: 1 });
  if (photosQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (photosQuery.isError) {
    return <div>Error: {photosQuery.error.message}</div>;
  }

  return (
    <div>
      <h1>home : </h1>
      <div className="columns-4 gap-5">
        {photosQuery.data.results.map((photo: any) => (
          <div key={photo.id}>
            <img src={photo.urls.small} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
