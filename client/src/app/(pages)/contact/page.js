import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ContactForm from "@/components/pages/contact/ContactForm";

export const metadata = {
  title: "Contact  || Homez - Real Estate NextJS Template",
};

const Contact = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Our Contact With Map */}
      <section className="p-0">
        <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.2869934920495!2d90.36561957592886!3d23.80839158654639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1004c51b2db%3A0x254957df1d4af9b7!2sMirpur%2010%20Metro%20Station!5e0!3m2!1sen!2sbd!4v1743948686411!5m2!1sen!2sbd"
          title="London Eye, London, United Kingdom"
          aria-label="London Eye, London, United Kingdom"
        />
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section></section>
      {/* End Our Contact Form */}

      {/* Contact form start here */}
      <section className="container">
        <ContactForm />
      </section>
      {/* Contact form end here */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Contact;
