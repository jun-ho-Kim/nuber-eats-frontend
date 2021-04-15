import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
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
    [key: string]: string;
}

export const AddDish = () => {
    const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
    const history = useHistory();
    const { restaurantId } = useParams();
    const { register, handleSubmit, formState, getValues, setValue } = useForm<IForm>({
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
    const onAddOptionClick = () => {
        setOptionsNumber((current) => [Date.now(), ...current]);
    };
    const onDeleteClick = (data: number) => {
        setOptionsNumber((current) => current.filter((id) => id !== data));
        setValue(`${data}-optionName`, "");
        setValue(`${data}-optionExtra`, "");
    }
    const onSubmit = () => {
        const {name, price, description, ...rest} = getValues();
        console.log("rest", rest);
        const optionObjects = optionsNumber.map((theId) => ({
            name: rest[`${theId}-optionName`],
            extra: rest[`${theId}-optionExtra`],
        }));
        createDishMutation({
            variables: {
                input: {
                    name,
                    price: +price,
                    description,
                    restaurantId: +restaurantId,
                    options: optionObjects,
                }
            }
        });
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
                <div>
                    <h4>Dish Options</h4>
                    <span
                        className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 " 
                        onClick={onAddOptionClick}
                    >
                        Add Dish Option
                    </span>
                    {optionsNumber.length !== 0 && 
                        optionsNumber.map((id) => (                         
                            <div key={id} className="mt-5">
                                <h1>Options</h1>
                                <input
                                    ref={register}
                                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                                    name={`${id}-optionName`}
                                    type="text"
                                    placeholder="Option Name"
                                />
                                <input
                                    ref={register}
                                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                                    name={`${id}-optionExtra`}
                                    type="number"
                                    min={0}
                                    placeholder="Option Extra"
                                />
                                <span 
                                    className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5"
                                    onClick={() => onDeleteClick(id)}>Delete Option</span>
                            </div>
                        ))
                    }
                </div>
                
                <Button 
                    loading={loading}
                    actionText="Create Dish"
                    canClick={formState.isValid}
                />
            </form>
        </div>
    )
};