import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <title>Invalid Page</title>
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-50 text-red-600 mb-6 mx-auto shadow-md">
          <span className="text-4xl font-black">404</span>
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Page not found
        </h1>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Go to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Go Back
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          If you think this is a mistake, check the URL or return to the home
          page.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
