const galleryData = [
  {
    id: 1,
    title: "Sunset at the Lake",
    imageUrl: "https://media.istockphoto.com/id/1430063884/photo/lake-kinneret-on-the-sunset.jpg?s=612x612&w=0&k=20&c=9PD3d55BcM0VuwTBS5EJEIAmVuddh5yJ7DvA-YOKdQk=",
  },
  {
    id: 2,
    title: "Mountain Hike",
    imageUrl: "https://www.reserveamerica.com/articles/wp-content/uploads/2024/07/11174967-1e85-45df-8097-ac30b3bb1c34.jpg",
  },
  {
    id: 3,
    title: "Forest Camp",
    imageUrl: "https://ourownstartup.com/wp-content/uploads/2020/12/forest-camping-c.jpg",
  },
  {
    id: 4,
    title: "Tent Under Stars",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW5E_y5oEwFosxugEzLfAIIZnkynunZmDZ_g&s",
  },
  {
    id: 5,
    title: "Campfire Fun",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMvR_T2Z8xZ5LF3ITTbuRH0uV-1273AID7g&s",
  },
  {
    id: 6,
    title: "River Side Camp",
    imageUrl: "https://thumbs.dreamstime.com/b/riverside-campsite-glowing-campfire-green-tent-set-up-nearby-nature-relaxation-concepts-evening-setting-riverside-342207668.jpg",
  },
];

const Gallery = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#2d3820]">
        Our Campers Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryData.map(({ id, title, imageUrl }) => (
          <div
            key={id}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 bg-white">
              <h3 className="text-center text-sm text-gray-700 font-semibold">
                {title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
