import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage.Jsx";
import Root from "../Layout/Root";
import Login from "../Pages/Login & Register/Login";
import Register from "../Pages/Login & Register/Register";
import MealDetails from "../Components/MealDetails/MealDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/userHome/userHome";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import AddMeal from "../Pages/Dashboard/addMeal/addMeal";






const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "login",
            element: <Login></Login>
        },
        {
            path: "register",
            element: <Register></Register>
        },
        {
          path: "meal/:id",
          element: <MealDetails></MealDetails>,
          loader: ({params})=> fetch(`http://localhost:5000/meal/${params.id}`)
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
          path: "userHome",
          element:<UserHome></UserHome>
        },
        {
          path: "userProfile",
          element: <UserProfile></UserProfile>
        },
        // admin only routes
        {
          path: "adminHome",
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: "manageUsers",
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: "addMeal",
          element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
        }
      ]
    }
  ]);

  export default router;