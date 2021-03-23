import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables, loginMutation_login } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput){
        login(input: $loginInput) {
            #backend에 InputType을 사용
            ok
            token
            error
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
};

const onCompleted = (data: loginMutation) => {
    const {
        login: { error, ok, token }
    } = data;
    if(ok) {
        console.log(token);
    }
};
const onError = () => {};

export const Login = () => {
    const {register, getValues, watch, errors, handleSubmit} = useForm<ILoginForm>()
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
        loginMutation, 
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
        onError,
        variables: {
            loginInput: {
                email: watch("email"),
                password: watch("password"),
            },
        },
    });
    const onSubmit = () => {
        if(!loading) {
            loginMutation()
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
                <h3 className="text-2xl text-gray-800">Login</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 mt-5 px-5"
                >
                    <input
                        ref={register({ required: "Email is required "})}
                        name="email"
                        required
                        type="email"
                        placeholder="Email"
                        className="input"
                    />
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    <input
                        ref={register({required: "Password is require", minLength: 10})}
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input"
                    />
                    {errors.password?.message === "minLenth" && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="Password must be more than 10 chars." />
                    )}
                    <button className="mt-3 btn">
                        {loading? "Loading..." : "Log In"}
                    </button>
                    {loginMutationResult?.login.error && (
                        <FormError errorMessage={loginMutationResult.login.error} />
                    )} 
                </form>
            </div>
        </div>
    )
};