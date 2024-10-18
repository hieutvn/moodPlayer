import { useRouteError } from 'react-router-dom';

function ErrorPage() {

    const error = useRouteError();

    return (

        <div id="error-page" style={{ padding: "2rem 0 0 3rem", color: "white" }}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )

}


export default ErrorPage;