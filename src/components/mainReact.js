import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import ApplicationViews from "./ApplicationViews"
import { NavBar } from "./NavBar/navBar"


export const MainReact = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("capstone_customer")) {
            return (
              <>
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );