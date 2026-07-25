import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {

  const {
    user,
    loading,
  } = useAuth();

  /*
  While checking authentication
  don't redirect yet.

  Wait until GET /me finishes.
  */

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <h1 className="text-2xl font-bold">

          Loading...

        </h1>

      </div>

    );

  }

  /*
  User NOT logged in

  Redirect Login
  */

  if (!user) {

    return <Navigate to="/login" replace />;

  }

  /*
  Logged In

  Show requested page.
  */

  return children;

};

export default ProtectedRoute;