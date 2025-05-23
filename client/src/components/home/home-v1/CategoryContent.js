"use client";
import Pagination from "@/components/common/Pagination";
import Image from "next/image";
import Link from "next/link";

export default function CategoryContent({
  product,
  meta,
  onPageChange,
  mainProject,
}) {
  const getSingleImage = (images) => {
    if (Array.isArray(images)) {
      return images[0] || "/path/to/fallback-image.jpg";
    }
    return images || "/path/to/fallback-image.jpg";
  };

  const projectName = mainProject?.name || "Project Details";
  const projectImage = mainProject?.images
    ? getSingleImage(mainProject.images)
    : "/path/to/fallback-image.jpg";
  const projectDetails = mainProject || {};

  return (
    <div className="py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg p-6 mb-8 w-full duration-300">
          <div className="">
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-950 animate-fade-in me-12 text-center my-12">
              PROJECT
              <p className="text-blue-600">{projectName}</p>
            </h1>
          </div>

          <div className="flex justify-center my-12">
            <Image
              width={600}
              height={400}
              className="h-96 object-cover rounded-lg shadow-md"
              src={projectImage}
              alt={projectName}
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-building text-blue-600 mr-2"></i> Project
            Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>{" "}
                Location
              </span>
              <span className="text-gray-600">
                {projectDetails.address || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-compass text-blue-500 mr-2"></i> Facing
              </span>
              <span className="text-gray-600">
                {projectDetails.facing || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-ruler-vertical text-green-500 mr-2"></i>{" "}
                Building Height
              </span>
              <span className="text-gray-600">
                {projectDetails.building_height
                  ? `${projectDetails.building_height} floor`
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-expand-arrows-alt text-purple-500 mr-2"></i>{" "}
                Land Area
              </span>
              <span className="text-gray-600">
                {projectDetails.land_area
                  ? `${projectDetails.land_area} sqft`
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-road text-yellow-500 mr-2"></i> Road Width
              </span>
              <span className="text-gray-600">
                {projectDetails.road_width
                  ? `${projectDetails.road_width} ft`
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-rocket text-orange-500 mr-2"></i> Launching
                Date
              </span>
              <span className="text-gray-600">
                {projectDetails.launching_date || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-handshake text-teal-500 mr-2"></i> Handover
                Date
              </span>
              <span className="text-gray-600">
                {projectDetails.hand_over_date || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between  border-gray-200 pb-2">
              <span className="flex items-center text-gray-700 font">
                <p className="text-gray-600 mt-4">
                  <strong className="flex items-center">
                    <i className="fas fa-file-alt text-gray-600 mr-2"></i>{" "}
                    Description
                  </strong>
                  {projectDetails.description || "No description available"}
                </p>
              </span>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">
          Available Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product?.length > 0 ? (
            product.map((listing) => (
              <Link href={`/property/${listing.id}`} key={listing.id}>
                <div className="item">
                  <div className="listing-style7 mb10">
                    <div className="list-thumb">
                      <Image
                        width={382}
                        height={248}
                        className="w-100 h-100 cover"
                        src={getSingleImage(listing.images)}
                        alt="listings"
                      />
                      <div className="sale-sticker-wrap">
                        <div className="list-tag2 rounded-0 fz12">FOR SALE</div>
                      </div>
                      <div className="list-meta">
                        <a href="#" className="mr5">
                          <span className="flaticon-fullscreen" />
                        </a>
                        <a href="#" className="mr5">
                          <span className="flaticon-new-tab" />
                        </a>
                        <a href="#">
                          <span className="flaticon-like" />
                        </a>
                      </div>
                    </div>
                    <div className="list-content">
                      <h6 className="list-title">
                        <Link href={`/product/${listing.id}`}>
                          {listing.description}
                        </Link>
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="list-price">
                          {listing.total_price.toLocaleString()} <span>৳</span>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <a
                            href="#"
                            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                          >
                            <i className="fas fa-bed text-blue-500 mr-1"></i>
                            {listing?.bedroom || "N/A"}
                          </a>
                          <a
                            href="#"
                            className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                          >
                            <i className="fas fa-bath text-green-500 mr-1"></i>
                            {listing?.bathroom || "N/A"}
                          </a>
                          <a
                            href="#"
                            className="flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-200"
                          >
                            <i className="fas fa-ruler-combined text-purple-500 mr-1"></i>
                            {listing?.flat_size
                              ? `${listing.flat_size} sqft`
                              : "N/A"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center">
              <p className="text-gray-600">No properties available.</p>
            </div>
          )}
        </div>
        {product?.length > 0 && (
          <Pagination meta={meta} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  );
}
