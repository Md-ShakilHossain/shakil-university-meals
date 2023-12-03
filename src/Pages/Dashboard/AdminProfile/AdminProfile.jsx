import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const AdminProfile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: count=0} = useQuery({
        queryKey:['adminCount'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/adminCount/${user?.email}`);
            return res.data;
        }
    });

    console.log(count);
    
    return (
        <div>
            <Helmet>
                <title>S.U_MeaLs | Admin Profile</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">Welcome Again {user.displayName}</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <div className="w-96 mx-auto">
                <img src={user.photoURL} alt="" className="w-96" />

                <p className="text-teal-500 font-semibold text-xl mt-6">Name: {user.displayName}</p>

                <p className="text-teal-500 font-semibold text-xl">Email: {user.email}</p>

                <p className="text-teal-500 font-semibold text-xl">Number of Added Meals : {count?.count}</p>
            </div>
        </div>
    );
};

export default AdminProfile;