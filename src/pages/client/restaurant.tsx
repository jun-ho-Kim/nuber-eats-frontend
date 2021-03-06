import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import {
    restaurant,
    restaurantVariables,
  } from "../../__generated__/restaurant";

//restaurant component 생성, gql 생성, 

const RESTAURANT_QUERY = gql`
    query restaurant($input: RestaurantInput!) {
        restaurant(input: $input) {
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

interface IRestaurantParams {
    restaurantId: string;
}

export const Restaurant = () => {
    const {id} = useParams();
    const {data} = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
        variables: {
            input: {
                restaurantId: +id, 
            }
        }
    })
    console.log("restaurant Data:", data);
    return (
        <div>
            <Helmet>
                <title>{data?.restaurant.restaurant?.name} | Number Eats</title>
            </Helmet>
            <div
                className=" bg-gray-800 bg-center bg-cover py-48"
                style={{
                backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
            }}>
                <div className="bg-white w-3/12 py-8 pl-48">
                    <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
                    <h5 className="text-sm font-light mb-2">
                    {data?.restaurant.restaurant?.category?.name}
                    </h5>
                    <h6 className="text-sm font-light">
                        {data?.restaurant.restaurant?.address}
                    </h6>
                </div>
            </div>
            <div className="container grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                {data?.restaurant.restaurant?.menu.map((dish, index) => {
                    <Dish
                        key={index}
                        name={dish.name}
                        description={dish.description}
                        price={dish.price}
                        isCustomer={true}
                        options={dish.options}
                    />
                })}
            </div>
        </div>
    )
}