import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="bg-teal-100 min-h-screen" >
            <div className="max-w-sm mx-auto pt-24">
                <img className="rounded-lg " src="https://i.ibb.co/6DgM6XS/404.jpg" alt="" />
                <div className="w-fit mx-auto mt-6">
                    <Link to="/"><Button>Back Home</Button></Link>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;