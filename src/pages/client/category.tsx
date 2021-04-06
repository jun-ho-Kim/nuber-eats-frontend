import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
    query category($input: CategoryInput!) {
        category(input: $input) {
            ok
            error
            totalPages
            totalResults
            category {
                ...CategoryParts
            }
            restaurants {
                ...RestaurantParts
            }
        },
        ${RESTAURANT_FRAGMENT}
        ${CATEGORY_FRAGMENT}
    }
`;

interface ICategoryParams {
    slug: string;
}

export const Category = () => {
    const params = useParams();
    console.log("params", params);
    const {data} = useQuery<category, categoryVariables>(CATEGORY_QUERY, {
        variables: {
            input: {
                page: 1,
                slug: params.slug,
            }
        }
    });
    
    return (
        <div>
            <h1>Category</h1>
        </div>
    )
}