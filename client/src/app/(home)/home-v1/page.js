import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Blog from "@/components/home/home-v1/Blog";
import FilterComponent from "@/components/home/home-v1/FilterComponent";
import FilterProperties from "@/components/home/home-v1/FilterProperties";
import PropertiesByCities from "@/components/home/home-v1/PropertiesByCities";
import Slider from "@/components/home/home-v1/Slider";
import Vendor from "@/components/home/home-v1/Vendor";
import PopularCollection from "@/components/pages/popular-collection/popular-collection";
import Reviews from "@/components/pages/reviews/Reviews";

export const metadata = {
  title: "The Premium Homes Ltd",
};

const Home_V1 = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <Slider />

      <section className="pb40-md pb90">
        <div className="container">
          <div className="pb-16">
            <FilterComponent />
          </div>
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          ></div>
        </div>
      </section>
      <section className="pt-0 pb20">
        <div className="container">
          <PropertiesByCities />
        </div>
      </section>
      <section className="pt-0 pb60">
        <div className="container">
          <FilterProperties />
        </div>
      </section>
      <section className="pt-0 pb60">
        <div className="container">
          <Reviews />
        </div>
      </section>

      <section className="pt-0 pb60">
        <div className="container">
          <PopularCollection />
        </div>
      </section>

      <section
        className="our-partners pt0"
        style={{ backgroundColor: " #F7F7F7" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h2
                  style={{
                    fontSize: "35px",
                    color: "#00C194",
                    textAlign: "center",
                    paddingTop: "30px",
                  }}
                >
                  Trusted by the world’s best
                </h2>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb90 pb20-md">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Vendor />
          </div>
        </div>
      </section>

      <section className="pb90 pb20-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up">
              <div className="main-title text-start text-md-center">
                <h2 className="text-3xl font-bold">From Our Blog</h2>
              </div>
            </div>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Home_V1;
