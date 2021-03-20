import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
    email?: string;
    password?: string;
}

export const Login = () => {
    const {register, getValues, errors, handleSubmit} = useForm<ILoginForm>()
    const onSubmit = () => {
        console.log("get Value:", getValues())
    };
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
                        <span className="font-medium text-red-500">
                            {errors.email?.message}
                        </span>
                    )}
                    <input
                        ref={register({required: "Password is require", minLength: 10})}
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input"
                    />
                    {errors.password?.type === "minLenth" && (
                        <span className="font-medium text-red-500">
                            Password must be more than 10 chars.
                        </span>
                    )}
                    {errors.password?.message && (
                        <span className="font-medium text-red-500">
                            {errors.password?.message}
                        </span>
                    )}
                    <button className="mt-3 btn">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
};