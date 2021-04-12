import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
    createRestaurant,
    createRestaurantVariables,
  } from "../../__generated__/createRestaurant";

import {MY_RESTAURANTS_QUERY} from "./my-restaurants";

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: CreateRestaurantInput!) {
        createRestaurant(input: $input) {
            ok
            error
            restaurantId
        } 
    }
`;

interface IFormProps {
    name: string;
    address: string;
    categoryName: string;
    file: FileList;
}

export const AddRestaurant = () => {
    const client = useApolloClient();
    const history = useHistory();
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const onCompleted = (data: createRestaurant) => {
        const {createRestaurant: {ok, restaurantId}} = data;
        if(ok) {
            const { name, categoryName, address } = getValues();
            setUploading(false);
            const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY })
            client.writeQuery({
                query: MY_RESTAURANTS_QUERY,
                data: {
                    myRestaurants: {
                        ...queryResult.myRestaurants,
                        restaurant: [
                            {
                                address,
                                category: {
                                  name: categoryName,
                                  __typename: "Category",
                                },
                                coverImg: imageUrl,
                                id: restaurantId,
                                isPromoted: false,
                                name,
                                __typename: "Restaurant",
                              },
                              ...queryResult.myRestaurants.restaurants,
                        ]
                    }
                }
            });
            history.push("/");
        }
    };
    const [createRestaurantMutation, {data}] = useMutation<
    createRestaurant,
    createRestaurantVariables
    >(CREATE_RESTAURANT_MUTATION, {
        onCompleted,
    });
    const { 
        register, 
        getValues, 
        formState, 
        handleSubmit 
    } = useForm<IFormProps>({
        mode: "onChange" 
    });
    const onSubmit = async () => {
        try {
            setUploading(true);
            const{ name, address, categoryName, file } = getValues()
            const actaulFile = file[0];
            const formBody = new FormData()
            formBody.append("file", actaulFile);
            const {url: coverImg} = await (
                await fetch("http://localhost:4000/uploads/", {
                    method: "POST",
                    body: formBody,
                })
            ).json();
            setImageUrl(coverImg);
            console.log("fileData.json()", coverImg);
            createRestaurantMutation({
                variables: {
                    input: {
                        name,
                        address,
                        categoryName,
                        coverImg,
                    }
                }
            })
        } catch {
        }
    }
    return (
        <div className="container flex flex-col items-center mt-52">
            <Helmet>
                <title>Create Restaurants | Nuber Eats</title>
            </Helmet>
            <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
            >
                <input
                    ref={register({ required: "Name is required."})}
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                <input 
                    ref={register({ required: "Address is required." })}
                    className="input"
                    type="text"
                    name="address"
                    placeholder="Address"
                />
                <input
                    ref={register({ required: "Category Name is required" })}
                    className="input"
                    type="text"
                    name="categoryName"
                    placeholder="Category Name"
                />
                <input
                    ref={register({ required: true})}
                    type="file"
                    name="file"
                    accept="image/*"
                />
                <Button
                    actionText="Create Restaurant"
                    loading={uploading}
                    canClick={formState.isValid}
                />
                {data?.createRestaurant?.error && (
                    <FormError errorMessage={data.createRestaurant.error} />
                )}
            </form>
        </div>
    )
}