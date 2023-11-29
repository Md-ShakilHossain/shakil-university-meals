import { FaClipboardList, FaEye, FaUserTie } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

// import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {

    // TODO: get isAdmin value from the database
    const isAdmin = true;

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-teal-600">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <div className="bg-white flex justify-center py-2 rounded-full"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/adminProfile'> <span><FaUserTie className="mr-2"></FaUserTie></span>Admin Profile</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/manageUsers'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> Manage Users</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/addMeal'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> Add Meal</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/allMeals'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> All Meals</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/allReviews'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> All Reviews</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/serveMeals'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> Serve Meals</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/upcomingMeals'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> Upcoming Meals</NavLink></li></div>
                                
                                    
                            </> :
                            <>
                                <div className="bg-white flex justify-center py-2 rounded-full"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/userProfile'> <span><FaUserTie className="mr-2"></FaUserTie></span> My Profile</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/userProfile'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> Requested Meals</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full mb-6"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/userProfile'> <span><FaEye className="mr-2"></FaEye></span> My Reviews</NavLink></li></div>


                            </>
                    }
                    <hr className="w-full border-t-2 border-solid border-white" />
                    {/* shared navLinks */}
                    <div className="bg-white flex justify-center py-2 rounded-full mt-6"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/'> <span><FaUserTie className="mr-2"></FaUserTie></span> Home</NavLink></li></div>


                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;