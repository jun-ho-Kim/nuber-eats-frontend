import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";

const ClientRoutes = [
      <Route key={1} path="/">
        <Restaurants />
      </Route>,
      <Route key={2} path="/confirm=">
          <ConfirmEmail />
      </Route>,
];


export const LoggedInRouter = () => {
    const {data, loading, error} = useMe();
    {console.log("data: ",data)}
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
        <>
        <Router>
            <Header />
            <Switch>
                {data.me.role === "Client" && ClientRoutes}
                <Route>
                    <NotFound />
                </Route>                
            </Switch>
            <button onClick={onClick}> Log Out </button>
        </Router>
        </>
    )
};
    
