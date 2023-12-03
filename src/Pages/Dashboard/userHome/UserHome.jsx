import useAuth from "../../../Hooks/useAuth";


const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-teal-500 text-2xl text-center font-bold">Welcome {user.displayName}</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />
            <h2 className="text-teal-500 text-2xl text-center font-bold">All The Best</h2>

            <img src="https://i.ibb.co/TqJf9pg/all-the-best.png" alt="" />
            
        </div>
    );
};

export default UserHome;