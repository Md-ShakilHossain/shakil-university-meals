import { Button, Dropdown } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";




const Navbar = () => {

    const { user, logOut } = useAuth();
    console.log(user);
    

    const links = <>
        <li><NavLink className={({ isActive, isPending }) =>
            `text-sm md:text-lg lg:text-xl ${isPending ? "pending" : isActive ? "underline text-[#FF444A]" : ""}`
        } to='/'>Home</NavLink></li>

        <li><NavLink className={({ isActive, isPending }) =>
            `text-sm md:text-lg lg:text-xl ${isPending ? "pending" : isActive ? "underline text-[#FF444A]" : ""}`
        } to='/meals'>Meals</NavLink></li>

        <li><NavLink className={({ isActive, isPending }) =>
            `text-sm md:text-lg lg:text-xl ${isPending ? "pending" : isActive ? "underline text-[#FF444A]" : ""}`
        } to='/upcomingMeals'>Upcoming Meals</NavLink></li>

        <li><NavLink className={({ isActive, isPending }) =>
            `text-sm md:text-lg lg:text-xl ${isPending ? "pending" : isActive ? "underline text-[#FF444A]" : ""}`
        } to='/upcomingMeals'><FaBell className="text-orange-400 mt-1 text-2xl"></FaBell></NavLink></li>
    </>


    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    return (
        <div className="w-4/5 mx-auto">

            <nav className="bg-gray-300 rounded-bl-2xl rounded-br-2xl border-x border-rose-400">
                <div className="flex items-center justify-between mx-auto p-4">
                    <div className="md:flex items-center bg-white px-8 rounded-2xl hidden">
                        <a href="/">
                            <img src="https://i.ibb.co/nrf2sSq/logo.png" className="h-16 mr-3" alt="Logo" />
                        </a>
                        <p className="text-3xl font-bold"><span className="text-teal-500">S.U_</span><span className="text-orange-400">MeaLs</span></p>
                    </div>

                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="true">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        }
                    >

                        <Dropdown.Item className="flex flex-col">{links}</Dropdown.Item>
                    </Dropdown>

                    <div className="hidden w-full lg:block md:w-auto">
                        <ul className="font-medium flex flex-col p-4 md:p-4 mt-4 rounded-2xl md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                            {links}
                        </ul>
                    </div>
                    <div>
                        {
                            user ?
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    className="rounded-lg bg-teal-100"
                                    label={
                                        <img className="rounded-full w-10 h-10" src={user.photoURL} alt="" />
                                    }
                                >
                                    {
                                        <p className="text-center p-3 text-xl">{user.displayName}</p>
                                    }

                                    <Dropdown.Item><Link to="/userHome">Dashboard</Link></Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button
                                        onClick={handleLogOut}
                                        >Logout</Button>
                                    </Dropdown.Item>


                                </Dropdown>

                                :
                                <Link to={`/login`}><Button>Join Us</Button></Link>
                        }

                    </div>

                </div>
            </nav>


        </div>
    );
};

export default Navbar;