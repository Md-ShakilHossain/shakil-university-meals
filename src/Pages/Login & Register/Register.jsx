import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

import Swal from "sweetalert2";

import { Helmet } from "react-helmet-async";
import LoginWithGoogle from "../Shared/LoginWithGoogle/LoginWithGoogle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Register = () => {

    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user info in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            badge: 'Bronze'
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    reset();
                                    Swal.fire({
                                        position: "top-start",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
    }
    console.log(errors);

    return (
        <div className="w-4/5 mx-auto mt-16 py-10 bg-slate-300 rounded-lg">
            <Helmet>
                <title>DreamJob | Register</title>
            </Helmet>

            <Card className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <h3 className="text-4xl text-teal-700 font-bold text-center mb-4">Please Register</h3>
                    <div className="form-control flex flex-col">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            {...register('name', { required: true })}
                            placeholder="Name"
                            className="input input-bordered mt-2" />
                        {errors.name?.type === 'required' && <p className="text-red-500 mt-2">Name is required.</p>}
                    </div>
                    <div className="form-control flex flex-col mt-2">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text"
                            {...register('photoURL', { required: true })}
                            placeholder="Photo URL"
                            className="input input-bordered mt-2" />
                        {errors.photoURL?.type === 'required' && <p className="text-red-500 mt-2">Photo URL is required.</p>}
                    </div>
                    <div className="form-control flex flex-col mt-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email"
                            {...register('email', { required: true })}
                            className="input input-bordered mt-2" />
                        {errors.email?.type === 'required' && <p className="text-red-500 mt-2">Email is required.</p>}
                    </div>
                    <div className="form-control flex flex-col mt-2">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password"
                            {...register('password',
                                {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                            className="input input-bordered mt-2" />
                        {errors.password?.type === 'required' && <p className="text-red-500 mt-2">Password is required.</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 mt-2">Password must be min 6 characters.</p>
                        }
                        {errors.password?.type === 'maxLength' && <p className="text-red-500 mt-2">Password must be less than 20 characters.</p>
                        }
                        {errors.password?.type === 'pattern' && <p className="text-red-500 mt-2">Password must be combination of a Uppercase, a lowercase, a number and a special character.</p>
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
            <p className="text-center mt-8">Already Have an account? <span className="font-bold"><Link to={`/login`}>Login</Link></span></p>
        </div>
    );
};

export default Register;