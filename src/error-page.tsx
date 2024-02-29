import { useRouteError } from "react-router-dom";

interface Error {
  statusText: string;
  message: string;
}
export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="w-full h-screen grid place-items-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
