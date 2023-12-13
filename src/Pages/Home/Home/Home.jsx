
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BestSell from "../BestSell/BestSell";
import MealsByCategory from "../MealsByCategory/MealsByCategory";
import Membership from "../Membership/Membership";
import NoFundReturn from "../NoFundReturn/NoFundReturn";
import Faq from "../FAQ/FAQ";


const Home = () => {
    return (
        <div>
            <Helmet><title>S.U_MeaLs | Home</title></Helmet>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <BestSell></BestSell>
            <Membership></Membership>
            <NoFundReturn></NoFundReturn>
            <Faq></Faq>
        </div>
    );
};

export default Home;