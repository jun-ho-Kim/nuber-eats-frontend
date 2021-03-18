import React, { useState } from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
    const onClick = () => {
        isLoggedInVar(true);
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = (event: any) => {
        console.log("submit resule: ", event)
    } 

    const onChange = (event: any) => {
        const {target: 
            {name, value} 
        } = event;
        if(name === "email") {
            setEmail(value)
        }
        if(name === "password") {
            setPassword(value)
        }
    }
    return (
        <div>
            <h1>Logged out</h1>
            <form onSubmit={onSubmit}>
            <div>
                <input 
                    onChange={onChange}
                    name="email"
                    type="email"
                    required
                    placeholder="email"
                    value={email}
                />
                <input
                    onChange={onChange}
                    name="password"
                    type="password"
                    required
                    placeholder="password"
                    value={password}
                />
                <button className="bg-yellow-300 text-white">Submit</button>
            </div>
            </form>
        </div>
    )
}