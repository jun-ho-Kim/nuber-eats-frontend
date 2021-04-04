import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Restaurant } from "../../components/restaurant";
import {
    restaurantsPageQuery,
    restaurantsPageQueryVariables,
  } from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_MUTATION = gql`
    query restaurantsPageQuery($input: RestaurantsInput!) {
        allCategories {
            ok
            error
            categories {
                id
                name
                coverImg
                slug
                restaurantCount
            }
        }
        restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            results {
                id
                name
                coverImg
                address
                category {
                    name
                }
                address
                isPromoted
            }
        }
    }
`;

export const Restaurants = () => {
    const [page, setPage] = useState(1);
    const {data, loading, error} = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
    >(RESTAURANTS_MUTATION, {
        variables: {
            input: {
                page,
            }
        }
    })
    const onNextPageClick = () => setPage((current) => current +1);
    const onPrePageClick = () => setPage((current) => current - 1);
    console.log("Restaurants data:", data)
    return (
        <div>
            {/* search */}
            <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
                <input
                    type="Search"
                    className="input rounded-md border-0 w-3/12"
                    placeholder="Search restaurants..."
                />
            </form>
            {!loading && (
                <div className="max-w-screen-xl pb-20 mx-auto mt-8">
                    {/* category */}
                    <div className="flex justify-around max-w-sm mx-auto">
                    {data?.allCategories.categories?.map((category) => (
                    <div className="flex flex-col group items-center cursor-pointer">
                        <div 
                            className="w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full bg-red-800"
                            // style={}
                        >
                        </div>
                        <span className="mt-1 text-sm text-center font-medium">
                            {category.name}
                        </span>
                    </div>
                    ))}
                    </div>
                    <div className="grid mt-16 grid-cols-3 gap-x-5 gap-y-10">
                    {/* restaurant */}
                    {data?.restaurants.results?.map((restaurant) => 
                        <Restaurant 
                            id={restaurant.id + ""}
                            coverImg={restaurant.coverImg}
                            name={restaurant.name}
                            categoryName={restaurant.category?.name}
                        />
                    )}
                    </div>
                    <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
                        {page > 1 ? (
                            <button 
                                onClick={onPrePageClick}
                                className="focus:outline-none font-medium text-2xl"
                            >&larr;</button>

                            ) : (<div></div>)
                            }
                            <span> Page {page} / {data?.restaurants.totalPages}</span>
                            {page !== data?.restaurants.totalPages ? (
                                <button 
                                    onClick={onNextPageClick}
                                    className="focus:outline-none font-medium text-2xl"
                                >
                                    &rarr;
                                </button> 
                            ) : (<div></div>)
                        }
                    </div>
                </div>
            )}
        </div>
    )
};