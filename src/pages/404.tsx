import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Not Found | Nuber Eats</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">
                Page Not Found
            </h2>
            <h4 className="font-medium text-base mb-5">
                The Page you`re looking for does not exist or has moved.
            </h4>
            <Link className="hover:underlink: text-emerald-600" to="/">
                Go Back home &rarr;
            </Link>
        </div>
    )
};