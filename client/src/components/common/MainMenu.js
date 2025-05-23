"use client";
import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [, setSubmenu] = useState("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  return (
    <ul className="ace-responsive-menu ">
      <li className="visible_list dropitem">
        <Link className="list-item" href="/">
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Home
          </span>
          {/* 
          <span className="arrow"></span> */}
        </Link>

        {/* Level Two*/}
        {/* <ul className="sub-menu">
          {homeItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </li>
      {user && (
        <li className="visible_list dropitem">
          <Link className="list-item" href="/marketplaces">
            <span>MarketPlaces</span>
          </Link>
        </li>
      )}
      <li className="visible_list dropitem">
        <Link className="list-item" href="/properties">
          <span>Properties</span>
        </Link>
      </li>
      <li className="visible_list dropitem">
        <Link className="list-item" href="/projects">
          <span>Projects</span>
        </Link>
      </li>
      <li className="visible_list dropitem">
        <Link className="list-item" href="/reviews">
          <span>Reviews</span>
        </Link>
      </li>
      <li className="megamenu_style dropitem">
        <Link className="list-item" href="/about">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            About
          </span>
        </Link>
      </li>
      <li className="visible_list dropitem">
        <Link className="list-item" href="/contact">
          <span>Contact</span>
        </Link>
      </li>

      <li className="visible_list dropitem">
        <Link className="list-item" href="/faq">
          <span
            className={topMenu == "property" ? "title menuActive" : "title"}
          >
            Faq
          </span>
        </Link>
      </li>

      <li className="megamenu_style dropitem">
        <Link className="list-item" href="/blogs">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            Blogs
          </span>
          {/* <span className="arrow"></span> */}
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
