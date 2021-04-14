import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

const CREATE_DISH_MUTATAION = gql`
    mutation creaetDish($input: CreateDishInput!) {
        createDish(input: $input) {
            ok
            error
        }
    }
`;

interface IParams {
    restaurantId: string;
}

interface IForm {
    name: string;
    price: string;
    description: string;
}

export const AddDish = () => {
    const history = useHistory();
    const { restaurantId } = useParams();
    const { register, handleSubmit, formState, getValues } = useForm<IForm>({
        mode: "onChange"
    });
    const [createDishMutation ,{ loading }] = useMutation(CREATE_DISH_MUTATAION, {
        refetchQueries: [
            {
                query: MY_RESTAURANTS_QUERY,
                variables: {
                    input: {
                        id: +restaurantId
                    }
                }
            }
        ]
    });
    const onSubmit = () => {
        const {name, price, description} = getValues();
        createDishMutation({
            variables: {
                input: {
                    name,
                    price: +price,
                    description,
                    restaurantId: +restaurantId
                }
            }
        })
        history.goBack();
    };
    return (
        <div className="container flex flex-col items-center mt-52">
            <Helmet>
                <title>Add Dish | Number Eats</title>
            </Helmet>

            <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>

            <form 
                className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
                onSubmit={handleSubmit(onSubmit)}>
                <input
                    ref={register({required: "Name is required. "})}
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                <input
                    ref={register({required: "Price is required."})}
                    className="input"
                    type="number"
                    name="price"
                    min={0}
                    placeholder="Price"
                />
                <input
                    ref={register({required: "Description is required."})}
                    className="input"
                    type="text"
                    name="description"
                    placeholder="Description"
                />
                <Button 
                    loading={loading}
                    actionText="Create Dish"
                    canClick={formState.isValid}
                />
            </form>
        </div>
    )
};