import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";

/*
====================================================

ReactDOM.createRoot()

This tells React where to render
our entire application.

It renders everything inside
<div id="root"></div>
present in index.html.

====================================================
*/

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  /*
  React.StrictMode

  Helps detect bugs during development.

  It has no effect in production.
  */

  <React.StrictMode>

    {/*
    ================================================

    AuthProvider

    This wraps the ENTIRE application.

    Every page

        Home

        Login

        Signup

        Dashboard

        Projects

    can access

        user

        loading

        refreshUser()

        logout()

    using

        useAuth()

    =================================================
    */}

    <AuthProvider>

      {/*

      BrowserRouter

      Enables routing.

      /login

      /signup

      /dashboard

      etc.

      */}

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </AuthProvider>

  </React.StrictMode>

);