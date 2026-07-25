import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

import api from "../api/axios";

/*
=============================================================
                WHAT IS AUTH CONTEXT?
=============================================================

Imagine your application has many pages.

App
│
├── Navbar
├── Dashboard
├── Projects
├── Campaigns
└── Settings

Every one of these pages needs to know:

"Who is currently logged in?"

Without Context, every component would have to call:

GET /api/auth/me

individually.

That means

Navbar ----------> /me
Dashboard -------> /me
Projects --------> /me
Campaigns -------> /me

Lots of duplicate requests.

Instead,

React Context stores ONE global user object.

Every component can access it.

App
│
│
AuthContext
│
├── Navbar
├── Dashboard
├── Projects
├── Campaigns

Everyone shares the SAME user.

Exactly like a global variable,
but managed safely by React.

=============================================================
*/

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/*
This describes what values
AuthContext provides.

Any component can use:

const {
    user,
    loading,
    refreshUser,
    logout
} = useAuth();
*/

interface AuthContextType {
  user: User | null;

  loading: boolean;

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;
}

/*
Initially Context has no value.

Later AuthProvider supplies it.
*/

const AuthContext =
  createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/*
=============================================================
            AUTH PROVIDER
=============================================================

This component wraps the ENTIRE application.

<App>

↓

<AuthProvider>

↓

Everything inside App can access
authentication information.

=============================================================
*/

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {

  /*
  Logged in user.

  Initially

  user = null

  After GET /me

  user = {
      id,
      name,
      email
  }
  */

  const [user, setUser] =
    useState<User | null>(null);

  /*
  While checking authentication
  we don't know whether user is
  logged in.

  loading = true

  After backend responds

  loading = false
  */

  const [loading, setLoading] =
    useState(true);

  /*
  =============================================================
      refreshUser()

  IMPORTANT

  This DOES NOT log the user in.

  Login already happened.

  This simply asks backend:

      "Who is currently logged in?"

  Backend:

      GET /auth/me

  Browser automatically sends cookie.

  Backend verifies JWT.

  Returns current user.

  We store it in Context.

  =============================================================
  */

  const refreshUser = async () => {

    const response =
      await api.get("/auth/me");

    setUser(response.data.data);

  };

  /*
  =============================================================

  Logout

  Backend clears cookie.

  We remove user from Context.

  React automatically re-renders.

  Navbar changes.

  Dashboard disappears.

  User becomes null.

  =============================================================
  */

  const logout = async () => {

    await api.post("/auth/logout");

    setUser(null);

  };

  /*
  =============================================================

  useEffect

  Runs ONLY ONCE

  when application starts.

  Example

  User refreshes browser.

  React forgets everything.

  BUT

  Browser still has cookie.

  So immediately ask backend

  GET /auth/me

  If cookie valid

      user restored.

  If invalid

      user remains null.

  This is why users remain logged in
  after refreshing.

  =============================================================
  */

  useEffect(() => {

    refreshUser()

      .catch(() => {

        setUser(null);

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);

  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        refreshUser,

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

/*
=============================================================

Custom Hook

Instead of

const context = useContext(AuthContext)

everywhere,

components simply write

const { user } = useAuth()

Much cleaner.

=============================================================
*/

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider."
    );

  }

  return context;

};