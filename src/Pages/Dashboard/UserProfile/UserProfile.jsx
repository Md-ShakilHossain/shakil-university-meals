import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UserProfile = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: singleUser = {} } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <div className="flex justify-evenly">
                <div className="flex-1">
                    <h3 className="text-teal-500 text-2xl text-center font-bold">Welcome Again {user.displayName}</h3>
                    <br />
                    <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
                </div>
                { singleUser.badge === 'Bronze' &&
                    <div className="w-32">
                    <img src="https://i.ibb.co/bJxd1kp/bronze.png" className="w-24" />
                    <p className="text-orange-600 ml-3 text-xl font-bold">Bronze</p>
                </div>
                }
                { singleUser.badge === 'Gold' &&
                    <div className="w-32">
                    <img src="https://i.ibb.co/3CGrHZG/gold.png" className="w-24" />
                    <p className="text-orange-600 ml-3 text-xl font-bold">Gold</p>
                </div>
                }
            </div>
            <div className="flex justify-center">
                <img src={user.photoURL} className="w-[700px] h-80 rounded-lg" />
            </div>

            <p className="text-teal-500 text-center text-xl font-bold mt-6">Name: {user.displayName}</p>
            <p className="text-teal-500 text-center text-xl font-bold">Email: {user.email}</p>
            <p className="text-teal-500 text-center text-xl font-bold">Badge: {singleUser.badge}</p>

        </div>
    );
};

export default UserProfile;