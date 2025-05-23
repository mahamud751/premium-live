"use client";
import React, { useState } from "react";

const ScheduleTour = ({ product }) => {
  const [formData, setFormData] = useState({
    name: "",
    id: product?.id,
    email: "",
    phone: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://erp.samironbarai.xyz/v1/product-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            id: formData.id,
            mobile: formData.phone,
            email: formData.email,
            details: formData.details,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the request");
      }

      const result = await response.json();
      setSuccess("Tour request submitted successfully!");
      setFormData({ name: "", email: "", phone: "", details: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ps-navtab">
      <div className="tab-content" id="pills-tabContent">
        <div role="tabpanel">
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb20">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb20">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb20">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb10">
                  <textarea
                    cols={30}
                    rows={4}
                    placeholder="Enter Your Messages"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="d-grid">
                  <button
                    type="submit"
                    className="ud-btn btn-thm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>

              {success && (
                <div className="col-md-12 mt20">
                  <p className="text-success">{success}</p>
                </div>
              )}
              {error && (
                <div className="col-md-12 mt20">
                  <p className="text-danger">{error}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTour;
