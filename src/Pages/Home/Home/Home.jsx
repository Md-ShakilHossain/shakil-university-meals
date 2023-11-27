
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BestSell from "../BestSell/BestSell";
import NoFundReturn from "../NoFundRetuen/NoFundReturn";
import MealsByCategory from "../MealsByCategory/MealsByCategory";


const Home = () => {
    return (
        <div>
            <Helmet><title>S.U_MeaLs | Home</title></Helmet>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <BestSell></BestSell>
            <NoFundReturn></NoFundReturn>
        </div>
    );
};

export default Home;