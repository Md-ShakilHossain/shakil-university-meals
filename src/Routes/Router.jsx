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
import AllMeals from "../Pages/Dashboard/AllMeals/AllMeals";
import UpdateMeal from "../Components/updateMeal/UpdateMeal";
import UpcomingMeals from "../Pages/Dashboard/UpcomingMeals/UpcomingMeals";
import Payment from "../Pages/Payment/Payment";
import RequestedMeal from "../Pages/Dashboard/RequestedMeal/RequestedMeal";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import UpdateReview from "../Components/UpdateReview/UpdateReview";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import UpcomingMeal from "../Pages/UpcomingMeal/UpcomingMeal";
import Meals from "../Pages/Meals/Meals";






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
        },
        {
          path: "checkout/:name",
          element: <PrivateRoute><Payment></Payment></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/package/${params.name}`)
        },
        {
          path: "upcomingMeal",
          element: <UpcomingMeal></UpcomingMeal>
        },
        {
          path: "meals",
          element: <Meals></Meals>
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
        {
          path: "requestedMeal",
          element: <RequestedMeal></RequestedMeal>
        },
        {
          path: "myReviews",
          element: <MyReviews></MyReviews>
        },
        {
          path: "updateReview/:id",
          element: <UpdateReview></UpdateReview>,
          loader: ({params})=> fetch(`http://localhost:5000/allReviews/${params.id}`)
        },
        // admin only routes
        {
          path: "adminHome",
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: "adminProfile",
          element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        },
        {
          path: "manageUsers",
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: "addMeal",
          element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
        },
        {
          path: "allMeals",
          element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
        },
        {
          path: "updateMeal/:id",
          element: <AdminRoute><UpdateMeal></UpdateMeal></AdminRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/meal/${params.id}`)
        },
        {
          path: "upcomingMeals",
          element: <AdminRoute><UpcomingMeals></UpcomingMeals></AdminRoute>
        }
      ]
    }
  ]);

  export default router;