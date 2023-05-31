import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
const arraySeller = [
  {
    src: "https://cdn.shopaccino.com/refresh/articles/banner-332299_l.jpg",
    alt: "Cinamon",
    name: "Cinamon",
    // category: "Category 1",
    price: "$45.95",
    percent: "30%",
  },
  {
    src: "https://i0.wp.com/writy.tn/wp-content/uploads/2023/01/Anise-seeds-Pimpinella-anisum-spice.webp?fit=758%2C505&ssl=1",
    alt: "Anise",
    name: "Anise",
    // category: "Category 2",
    price: "$20.95",
    percent: "70%",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT93jSdQlw3HMnFa2hsvT4yWNYKMnIXzGF5imnEdXx3nOeK5EyIiriviXXhAVcWph3dPhk&usqp=CAU",
    alt: "Tawook Spice",
    name: "Tawook Spice",
    // category: "Category 3",
    price: "$12.50",
    percent: "84%",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkkAU8i4-9vOO73QglO8g7068SKDYyWXWrQ&usqp=CAU",
    alt: "7 spice mix",
    name: "7 spice mix",
    // category: "Category 4",
    price: "$12.50",
    percent: "97%",
  },
];
function CategoryDesign() {

  return (
    <>
      {" "}
      <main className="about_parent-seller">
        {" "}
        <hr className="about_hr-seller" />{" "}
        <div className="about_container-seller">
          {" "}
          <section className="about_our_blog_container-seller">
            {" "}
            <div className="about_title_blog-seller">
              {" "}
              <h2 className="ourBloc_title-seller">Best Sellers</h2>{" "}
            </div>{" "}
            <div className="about_mission_container-seller">
              {" "}
              {arraySeller.map((product, index) => (
                <div className="mission_box-seller" key={index}>
                  {" "}
                  <img
                    className="about_img-seller"
                    src={product.src}
                    alt={product.alt}
                  />{" "}
                  <div className="product-category-seller">
                    {" "}
                    <span className="product-name-seller">
                      {product.name}
                    </span>{" "}
                    <span className="category-name-seller">
                      {" "}
                      {product.category}{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="boxes___container-seller">
                    {" "}
                    <span className="pay-value-seller value___for_two">
                      {" "}
                      {product.price}{" "}
                    </span>{" "}
                    <span className="percentage-value-seller value___for_two">
                      {" "}
                      {product.percent}{" "}
                    </span>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </section>{" "}
        </div>{" "}
        
        
      </main>{" "}
    </>
  );
}
export default CategoryDesign;