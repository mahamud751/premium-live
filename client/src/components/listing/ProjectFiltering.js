"use client";

import Image from "next/image";
import Link from "next/link";

// Dummy property data
const dummyData = [
  {
    id: 1,
    images: ["https://example.com/images/property1.jpg"],
    description:
      "Spacious 3-bedroom apartment with modern amenities and great city views.",
    floor_number: 5,
    bedroom: 3,
    bathroom: 2,
    flat_size: 1200,
    total_price: 15000000,
    status: "Available",
  },
  {
    id: 2,
    images: ["https://example.com/images/property2.jpg"],
    description:
      "Cozy 2-bedroom flat in a quiet neighborhood, perfect for small families.",
    floor_number: 2,
    bedroom: 2,
    bathroom: 1,
    flat_size: 850,
    total_price: 8500000,
    status: "Sold",
  },
  {
    id: 3,
    images: ["https://example.com/images/property3.jpg"],
    description: "Luxurious penthouse with large terrace and premium fittings.",
    floor_number: 10,
    bedroom: 4,
    bathroom: 3,
    flat_size: 2000,
    total_price: 25000000,
    status: "Available",
  },
];

const ProjectFiltering = () => {
  return (
    <section className="pt-0 pb-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dummyData.map((listing) => (
            <div className="market_page" key={listing.id}>
              <Link href={`/property/${listing.id}`} className="block">
                <div className="listing-style1 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="list-thumb">
                    <Image
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                      src={listing.images}
                      alt="Property image"
                    />
                  </div>
                  <div className="list-content p-4">
                    <h6 className="list-title font-bold text-lg">
                      {listing.description.length > 60
                        ? `${listing.description.slice(0, 60)}...`
                        : listing.description}
                    </h6>

                    <div className="flex flex-wrap items-center gap-4 px-4 py-2 my-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm">
                      <span className="flex items-center text-gray-700">
                        🏢 {listing.floor_number} Floor
                      </span>
                      <span className="flex items-center text-gray-700">
                        🛏 {listing.bedroom} bed
                      </span>
                      <span className="flex items-center text-gray-700">
                        🛁 {listing.bathroom} bath
                      </span>
                      <span className="flex items-center text-gray-700">
                        📐 {listing.flat_size} sqft
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="font-bold text-green-600 text-sm">
                        {listing.total_price.toLocaleString()} ৳
                      </p>
                      <p className="font-bold text-green-600 text-sm">
                        {listing.status}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFiltering;
