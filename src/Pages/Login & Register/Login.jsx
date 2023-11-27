import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../../Firebase/firebase.config";
import { Helmet } from "react-helmet-async";


const Login = () => {
    const { loginUser } = useAuth();
    const [error, setError] = useState('');

    const provider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        // const user = { email, password };
        // console.log(user);
        setError('');

        loginUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Login Successful',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                })
                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 1000);


            })
            .catch(() => {
                setError('Invalid Email or Password')
            })
    }

    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result.user);

                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="w-4/5 mx-auto mt-16 py-10 bg-slate-300">
            <Helmet>
                <title>S.U_MeaLs | Login</title>
            </Helmet>
            <h3 className="text-4xl text-teal-700 font-bold text-center mb-4">Please Login</h3>
            <Card className="max-w-sm mx-auto">
                <form onSubmit={handleLogin}
                    className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label value="Your email" />
                        </div>
                        <TextInput name="email" type="email" placeholder="Email Here" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Your password" />
                        </div>
                        <TextInput name="password" type="password" placeholder="Password Here" required />
                        <div>
                            {
                                error && <p className="text-red-500">{error}</p>
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox />
                        <Label>Remember me</Label>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>

            </Card>
            <div>
                <h3 className="mt-5 text-2xl text-center font-semibold">OR</h3>
                <Button
                onClick={handleLoginWithGoogle}
                className="mt-4 max-w-sm mx-auto">Login with Google 
                </Button>
            </div>
            <p className="text-center mt-8">New to DreamJobs? <span className="font-bold"><Link to={`/register`}>Register</Link></span></p>
        </div>
    );
};

export default Login;