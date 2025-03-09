import { useState } from "react";

const Adventure = () => {
    const [videos] = useState([
        { id: 1, title: "Camping in the Wild", url: "https://www.youtube.com/embed/R_InO9bxuwU?si=dKlbK7I4uZ6CnorQ" },
        { id: 2, title: "Survival Tips", url: "https://www.youtube.com/embed/T6INK2Ch1PY" },
        { id: 3, title: "Top 10 Campsites", url: "https://www.youtube.com/embed/PavYAOpVpJI?si=4p7_LIhrPV-rlON-" },
    ]);

    const [testimonials] = useState([
        { id: 1, name: "John Doe", text: "The best camping gear I’ve ever used!" },
        { id: 2, name: "Jane Smith", text: "Great quality products and fast delivery." },
        { id: 3, name: "thomas asi", text: "Great quality products and fast delivery." },
    ]);



    return (
        <div className="p-6 md:p-12  text-white">
            {/* Hero Section */}
            <div className="relative h-60  flex items-center justify-center bg-cover bg-center text-white text-2xl font-bold"
                style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?camping,adventure')" }}>
                <div className="bg-[#90c63e] bg-opacity-50 p-6 rounded-xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center">Adventure & Travel Vlogs</h1>
                    <p className="text-lg text-center mt-2">Explore the best camping and travel experiences!</p>
                </div>
            </div>

            {/* Video Blog Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-6">Featured Adventure Videos</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {videos.map(video => (
                        <div key={video.id} className="relative group">
                            <iframe
                                className="w-full h-56 rounded-lg shadow-md"
                                src={video.url}
                                title={video.title}
                                allowFullScreen
                            ></iframe>
                            <p className="text-center text-lg mt-2">{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="p-6 bg-white text-black shadow-md rounded-lg text-center w-full md:w-1/3">
                            <p className="text-gray-700 italic">"{testimonial.text}"</p>
                            <h3 className="text-xl font-semibold mt-2">{testimonial.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

           
        </div>
    );
};

export default Adventure;
