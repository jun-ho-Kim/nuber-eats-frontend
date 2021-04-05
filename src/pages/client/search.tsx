import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router';
import { RESTAURANT_FRAGMENT } from "../../fragment";
import { 
    searchRestaurant,
    searchRestaurantVariables,
} from '../../__generated__/searchRestaurant';

const SEACRH_RESTAURANT = gql`
    query searchRestaurant($input: SearchRestaurantInput!) {
        searchRestaurant(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants {
                ...RestaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
    const history = useHistory();
    const location = useLocation();
    const [callQuery, {data, loading, called}] = useLazyQuery<
        searchRestaurant,
        searchRestaurantVariables
    >(SEACRH_RESTAURANT);
    useEffect(() => {
        const [_, query] = location.search.split("?term=");
        if(!query) {
            return history.push("/")
        }
        callQuery({
            variables: {
                input: {
                    page: 1,
                    query
                }
            }
        })
    }, [location, history])
    console.log("data:", data, "loading:", loading, "called:", called )
    return (
        <div>
            <Helmet>
                <title>Search | Nuber Eats</title>
            </Helmet>
            <h1>Search page</h1>
        </div>
    )
}