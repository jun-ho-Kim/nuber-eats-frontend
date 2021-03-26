import { gql, useQuery } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
// import { meQuery } from "../__generated__/meQuery";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
    query meQuery {
        me {
          id
          email
          role
          verified
        }
    }
`;

export const LoggedInRouter = () => {
    const {data, loading, error} = useQuery<meQuery>(ME_QUERY);
    console.log("data:", data);
    console.log("data:", data);
    if(!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">
                    Loaidng...
                </span>
            </div>
        )
    }
    const onClick = () => {
        isLoggedInVar(false)
    }

    return (
        <div>
            <h1>Logged In</h1>
            <button onClick={onClick}>Log Out</button>
        </div>
    )
} 
    
