import Image from "next/image";

const vendors = [
  {
    id: 1,
    name: "Elite Homes",
    info: "Over 100 properties listed",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Urban Realty",
    info: "Top-rated agents in city",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Luxury Estates",
    info: "Specialized in villas & mansions",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Coastal Living",
    info: "Experts in beachfront homes",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

const Vendor = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">
        Top Real Estate Vendors
      </h2>
      <div className="grid grid-cols-1 mt-5 md:mt-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="w-full h-48 relative">
              <Image
                src={vendor.image}
                alt={vendor.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{vendor.name}</h3>
              <p className="text-gray-500 mt-1">{vendor.info}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vendor;
