"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";

import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import React from "react";

import axios from "axios";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import FilterProperties from "@/components/home/home-v1/FilterProperties";

const Propery = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const fetchSingleProduct = async (id, token) => {
    const response = await axios.get(
      `https://erp.samironbarai.xyz/v1/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };
  const { data: product } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => fetchSingleProduct(id, token),
  });

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            <PropertyHeader product={product} />
          </div>

          <div className="row mb30 mt30">
            <PropertyGallery product={product} />
          </div>

          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  <OverView product={product} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions product={product} />

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails product={product} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5"> Book A Free Consultation</h4>

                  <ScheduleTour />
                </div>

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Get More Information</h6>
                    <ContactWithAgent />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <FilterProperties />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Propery;
