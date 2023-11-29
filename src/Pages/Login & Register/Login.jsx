import { Card } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import LoginWithGoogle from "../Shared/LoginWithGoogle/LoginWithGoogle";
import { useForm } from "react-hook-form";


const Login = () => {
    const { loginUser } = useAuth();
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                Swal.fire({
                    position: "top-start",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.error(error);
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setError('Invalid email or password');
                } else {
                    setError('Invalid email or password');
                }
            });
    }
    console.log(errors);


    return (
        <div className="w-4/5 mx-auto mt-16 py-10 bg-slate-300 rounded-lg">
            <Helmet>
                <title>S.U_MeaLs | Login</title>
            </Helmet>

            <Card className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <h3 className="text-4xl text-teal-700 font-bold text-center mb-4">Please Login</h3>

                    <div className="form-control flex flex-col mt-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email"
                            {...register('email', { required: true })}
                            className="input input-bordered mt-2" />
                    </div>
                    <div className="form-control flex flex-col mt-2">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password"
                            {...register('password',
                                { required: true })}
                            className="input input-bordered mt-2" />
                            
                    </div>

                    <div>
                    {
                        error && <p className="text-red-500"> {error}</p>
                    }

                    </div>
                    <div className="form-control mt-6">
                        <input className="bg-teal-500 hover:bg-teal-700 cursor-pointer w-full py-2 rounded-lg text-white font-semibold" type="submit" value="Submit" />
                    </div>
                </form>

            </Card>
            <div>
                <h3 className="mt-5 text-2xl text-center font-semibold">OR</h3>
                <LoginWithGoogle></LoginWithGoogle>
            </div>
            <p className="text-center mt-8">New to DreamJobs? <span className="font-bold"><Link to={`/register`}>Register</Link></span></p>
        </div>
    );
};

export default Login;