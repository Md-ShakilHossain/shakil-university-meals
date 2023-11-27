
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../Hooks/useAuth';
import { Spinner } from 'flowbite-react';
import Swal from "sweetalert2";



const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <Spinner aria-label="Extra large spinner example" size="xl" />;
    }

    if (user) {
        return children;
    }

    const alert = () => {
        Swal.fire({
            title: 'Login First',
            text: 'You Need to Login First',
            icon: 'warning',
            confirmButtonText: 'Okay'
        })
     }

    return <div> <Navigate state={location.pathname} to='/login'></Navigate>
    {
        alert()
    }
    </div> 
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;