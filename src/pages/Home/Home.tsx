import Category from "./Categories/Category";
import FeaturedProducts from "./FeaturedProduct/FreaturedProduct";
import Hero from "./Hero/Hero";
import ReProducts from "./RecommendedProducts/ReProducts";

const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <ReProducts></ReProducts>
           <Category></Category>
           <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Home;