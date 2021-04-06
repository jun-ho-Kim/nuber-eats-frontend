import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Header } from "../components/header";
import { Restaurant } from "../pages/client/restaurant";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const clientRoutes = [
    {
        path: "/",
        component: <Restaurants />
    },
    {
        path: "/search",
        component: <Search />
    }, 
    {
        path: "/category/:slug",
        component: <Category />
    },
    {
        path: "/restaurants/:id",
        component: <Restaurant />
    },
];

const commonRoutes = [
    {
        path: "/edit-profile", component: <EditProfile />
    },
    {
        path: "/confirm", component: <ConfirmEmail />
    }
]

const restaurantRoutes = [
    {path: "/", component: <Restaurant />}
]


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
                {data.me.role === "Client" &&
                    clientRoutes.map((route) => (
                        <Route key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                    {data.me.role === "Owner" &&
                        restaurantRoutes.map((route) => (
                            <Route key={route.path} path={route.path}>
                                {route.component}
                            </Route>
                        ))
                    }
                    {commonRoutes.map((route) => (
                        <Route key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                <Route>
                    <NotFound />
                </Route>                
            </Switch>
            <button onClick={onClick}> Log Out </button>
        </Router>
        </>
    )
};
    
