import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className=" text-black py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Camper-Shop</h1>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          Welcome to Camper-Shop, your go-to destination for all things outdoor
          and adventure! We are passionate about providing top-quality camping
          gear, apparel, and accessories to make your outdoor experience
          unforgettable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="bg-[#90c63e] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p>
              At Camper-Shop, we strive to provide high-quality camping and
              outdoor equipment at affordable prices. Our goal is to inspire
              people to explore nature with the best gear available.
            </p>
          </div>

          <div className="bg-[#90c63e] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Why Choose Us?</h2>
            <ul className="list-disc list-inside">
              <li>Premium quality outdoor gear</li>
              <li>Affordable and competitive pricing</li>
              <li>Fast and reliable shipping</li>
              <li>Excellent customer support</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-4">Join Our Adventure</h2>
          <p className="max-w-3xl mx-auto mb-6">
            Whether you are an experienced adventurer or just starting your
            journey, we have everything you need for a safe and enjoyable trip.
            Shop with us today and experience the great outdoors like never
            before!
          </p>
          <Link to={"/shop"}>
            <button className="bg-[#833d47] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#6d2c3a] transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
