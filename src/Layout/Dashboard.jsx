import { FaCar, FaClipboardList, FaEye, FaUserTie, FaUsers, FaWalking } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {

    // get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-teal-600">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <div className="bg-white flex justify-center py-2 rounded-full"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/adminProfile'> <span><FaUserTie className="mr-2"></FaUserTie></span>Admin Profile</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/manageUsers'> <span><FaUsers className="mr-2"></FaUsers></span> Manage Users</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/addMeal'> <span><FaBowlFood className="mr-2"></FaBowlFood></span> Add Meal</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/allMeals'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> All Meals</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/allReviews'> <span><FaEye className="mr-2"></FaEye></span> All Reviews</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/serveMeals'> <span><FaCar className="mr-2"></FaCar></span> Serve Meals</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/upcomingMeals'> <span><FaWalking className="mr-2"></FaWalking></span> Upcoming Meals</NavLink></li></div>
                                
                                    
                            </> :
                            <>
                                <div className="bg-white flex justify-center py-2 rounded-full"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/userProfile'> <span><FaUserTie className="mr-2"></FaUserTie></span> My Profile</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full my-4"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/requestedMeal'> <span><FaClipboardList className="mr-2"></FaClipboardList></span> Requested Meals</NavLink></li></div>

                                <div className="bg-white flex justify-center py-2 rounded-full mb-6"><li className="text-teal-500 font-semibold"><NavLink className="flex items-center" to='/dashboard/myReviews'> <span><FaEye className="mr-2"></FaEye></span> My Reviews</NavLink></li></div>


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