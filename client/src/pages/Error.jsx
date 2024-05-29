import { useRouteError } from "react-router-dom"

function Error() {
  const error = useRouteError()
  console.log(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, something wrong.</p>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  )
}

export default Error