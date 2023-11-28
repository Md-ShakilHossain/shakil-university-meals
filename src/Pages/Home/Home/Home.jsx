
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BestSell from "../BestSell/BestSell";
import NoFundReturn from "../NoFundRetuen/NoFundReturn";
import MealsByCategory from "../MealsByCategory/MealsByCategory";
import Membership from "../Membership/Membership";


const Home = () => {
    return (
        <div>
            <Helmet><title>S.U_MeaLs | Home</title></Helmet>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <BestSell></BestSell>
            <Membership></Membership>
            <NoFundReturn></NoFundReturn>
        </div>
    );
};

export default Home;