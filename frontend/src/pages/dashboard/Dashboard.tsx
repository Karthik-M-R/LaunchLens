import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-black">

        Dashboard

      </h1>

      <p className="mt-5">

        Welcome,

        <span className="font-bold">

          {" "}

          {user?.name}

        </span>

      </p>

      <p className="text-gray-600">

        {user?.email}

      </p>

      <button

        onClick={handleLogout}

        className="mt-8 rounded-xl bg-red-500 px-6 py-3 font-bold text-white"

      >

        Logout

      </button>

    </div>

  );

};

export default Dashboard;