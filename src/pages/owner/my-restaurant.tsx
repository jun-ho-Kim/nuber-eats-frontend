import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import { myRestaurant, myRestaurantVariables } from "../../__generated__/myRestaurant";

const MY_RESTAURANT_QUERY = gql`
    query myRestaurant($input: MyRestaurantInput!) {
        myRestaurant(input: $input) {
            ok
            error
            restaurant {
                ...RestaurantParts
                menu {
                    ...DishParts
                }
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${DISH_FRAGMENT}
`;

interface IParams {
    id: string;
}

export const MyRestaurant = () => {
    const {id} = useParams();
    const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
        variables: {
            input: {
                id: +id,
            }
        }
    });
    console.log("MyRestaurant Data", data?.myRestaurant.ok);
    return (
        <div>
            <Helmet>
                <title>{data?.myRestaurant.restaurant?.name || "Loading..."}</title>
            </Helmet>
            <div
                className="bg-gray-700 py-28 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
                }}    
            >
            </div>
            <div className="container mt-10">
                <h2 className="text-4xl font-medium mb-10">
                    {data?.myRestaurant.restaurant?.name || "Loading..."}
                </h2>
                <Link 
                    to={`/restaurants/${id}/add-dish`} 
                    className=" mr-8 text-white bg-gray-800 py-3 px-10"
                >
                    Add Dish &rarr;
                </Link>
                <Link to={``} className=" text-white bg-emerald-700 py-3 px-10">
                    Buy Promotion &rarr;
                </Link>
                <div className="mt-10">
                    {data?.myRestaurant.restaurant?.menu.length === 0 ? (
                        <h4 className="text-xl mb-5">Please upload a dish!</h4>
                    ): (
                        <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                            {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
                                <Dish
                                    key={index}
                                    name={dish.name}
                                    description={dish.description}
                                    price={dish.price}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}