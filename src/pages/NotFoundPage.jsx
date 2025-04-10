import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-orange-400 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">Page Not Found</h1>
      <p className="text-xl mb-5">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="text-white bg-indigo-400 hover:bg-indigo-600 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage;
