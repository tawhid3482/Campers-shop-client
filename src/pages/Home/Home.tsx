import Adventure from "./AdventureVlog&Video/Adventure";
import Category from "./Categories/Category";
import FAQ from "./FAQ/Faq";
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
           <Adventure></Adventure>
           <FAQ></FAQ>
        </div>
    );
};

export default Home;