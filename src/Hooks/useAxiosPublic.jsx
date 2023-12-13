import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://shakil-university-meals-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;