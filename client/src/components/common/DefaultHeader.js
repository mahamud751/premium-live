"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

const DefaultHeader = () => {
  const { token, user } = useAuth();
  const [navbar, setNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={246}
                        height={44}
                        src="/images/logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={246}
                        height={44}
                        src="/images/logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>

                  <MainMenu />
                </div>
              </div>

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {!token ? (
                    <a
                      href="#"
                      className="login-info d-flex align-items-cente"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                      onClick={openModal}
                    >
                      <i
                        className="far fa-user-circle fz16 me-2"
                        style={{
                          color: "#00C194",
                        }}
                      />{" "}
                      <span className="d-none d-xl-block">Login</span>
                    </a>
                  ) : (
                    <Link
                      className="mx-2 ud-btn add-property bdrs60 mx-xl-4"
                      href="/dashboard-home"
                      style={{
                        color: "white",
                        backgroundColor: "#00C194",
                      }}
                    >
                      {user?.name}
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="signup-modal">
        {isModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
            aria-labelledby="loginSignupModalLabel"
            aria-hidden={!isModalOpen}
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <LoginSignupModal closeModal={closeModal} />
            </div>
          </div>
        )}
        {isModalOpen && (
          <div
            className="modal-backdrop fade show"
            onClick={closeModal}
            style={{ zIndex: 1040 }}
          />
        )}
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
    </>
  );
};

export default DefaultHeader;
