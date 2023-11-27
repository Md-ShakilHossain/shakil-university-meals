import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";


const Register = () => {

    const { createUser } = useAuth();
    const [error, setError] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoURL = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        // const user = { name, photoURL, email, password };
        setError('');
        setFirebaseError('');

        if (password.length < 6) {
            setError('Password length should be at least 6');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setError('Password should includes at least one capital letter');
            return;
        }
        else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            setError('Password should includes at least one special character');
            return;
        }

        createUser(email, password)
            .then(result => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration Successful',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                })
                console.log(result.user);
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL
                });
                navigate("/");
            })
            .catch(() => {
                setFirebaseError('Email already in used');
            })

    }

    return (
        <div className="w-11/12 mt-16 bg-slate-100">
            <Helmet>
                <title>DreamJob | Register</title>
            </Helmet>
            <h3 className="text-4xl text-teal-700 font-bold text-center mb-4">Please Register</h3>
            <Card className="max-w-sm mx-auto">
                <form onSubmit={handleRegister}
                    className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label value="Your Name" />
                        </div>
                        <TextInput name="name" type="text" placeholder="Name Here" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Photo URL" />
                        </div>
                        <TextInput name="photo" type="text" placeholder="Photo URL Here" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Your email" />
                        </div>
                        <TextInput name="email" type="email" placeholder="Email Here" required />
                        <div>
                            <p className="text-red-500 font-semibold">{firebaseError}</p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Your password" />
                        </div>
                        <TextInput name="password" type="password" placeholder="Password Here" required />
                        <div>
                            <p className="text-red-500 font-semibold">{error}</p>
                        </div>
                    </div>

                    <Button type="submit">Submit</Button>
                </form>

            </Card>
            <p className="text-center mt-8">Already Have an account? <span className="font-bold"><Link to={`/login`}>Login</Link></span></p>
        </div>
    );
};

export default Register;