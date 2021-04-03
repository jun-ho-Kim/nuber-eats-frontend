import { gql, useQuery } from "@apollo/client";
import React from "react";
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
    const {data, loading, error} = useQuery<
        restaurantsPageQuery,
        restaurantsPageQueryVariables
        >(RESTAURANTS_MUTATION, {
        variables: {
            input: {
                page: 1,
            }
        }
    })
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
                <div className="max-w-screen-xl mx-auto mt-8">
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
                    {/* restaurant */}
                    <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
                        {data?.restaurants.results?.map((restaurant) => 
                            <div>
                                <div className="bg-red-500 py-28 m">
                                </div>
                                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                                <span className="border-t-2 border-gray-200">
                                    {restaurant.category?.name}
                                </span>
                            </div>
                        
                        )}
                    </div>
                </div>
            )}    
        </div>
    )
};