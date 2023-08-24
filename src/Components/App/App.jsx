// import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import MasterLayout from "../MasterLayout/MasterLayout";
import Home from "./../Home/Home";
import Movies from "./../Movies/Movies";
import TvShows from "./../TvShows/TvShows";

import Login from "./../Login/Login";
import People from "./../People/People";
import NotFound from "./../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Details from "./../Details/Details";
import { Offline, Online } from "react-detect-offline";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthStore";
import Register from "./../Register/Register";

function App() {
  let { userData, logout, saveUserData } = useContext(AuthContext);

  let routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout userData={userData} logout={logout} />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "tvshows",
          element: (
            <ProtectedRoute userData={userData}>
              <TvShows />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "home",
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "details/:id/:mediaType",
          element: (
            <ProtectedRoute userData={userData}>
              <Details />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <div>
      <div>
        <Online>
          <RouterProvider router={routes} />
        </Online>
        <Offline>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <h4>You are Offline Try to connect to Internet</h4>
          </div>
        </Offline>
      </div>
    </div>
  );
}

export default App;
