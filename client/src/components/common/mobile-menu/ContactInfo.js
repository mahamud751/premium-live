import React from "react";

const ContactInfo = () => {
  const contactInfo = [
    {
      id: 1,
      title: "Total Free Customer Care",
      phone: "+880 1689-584336",
    },
    {
      id: 2,
      title: "Need Live Support?",
      email: "premium@gmail.com",
    },
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
