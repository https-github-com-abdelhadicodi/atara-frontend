import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./index.css";
const arrayArrival = [
  {
    src: "https://akm-img-a-in.tosshub.com/sites/rd/resources/202006/blackpepper_1591428421_1200x675.png?size=684:384?size=1200:675",
    alt: "black pepper",
    name: "Black Pepper",
    category: "Spice",
    price: "$45.95",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs_kvkFLdwgOpvuMhtNALVZsLo2mGlMf3vOl4xFFI77OHLGfwnlvoL2Ogmt3LTeqf9HX0&usqp=CAU",
    alt: "Cinamon",
    name: "Cinamon",
    category: "Herbs",
    price: "$20.95",
  },
  {
    src: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/320546_2200-732x549.jpg",
    alt: "Ginger",
    name: "Ginger",
    category: "Herbs",
    price: "$12.50",
  },
  {
    src: "https://assets.iflscience.com/assets/articleNo/67832/aImg/66205/paprika-m.png",
    alt: "Paprika",
    name: "Paprika",
    category: "Spice",
    price: "$12.50",
  },
];
function newProduct() {
  return (
    <>
      <main className="about_parent">
        {/* <hr className="about_hr" /> */}
        <div className="about_container">
          <section className="about_title_content">
            {" "}
            <div className="home_author_image_container">
              {" "}
              <img
                className="about_img_parent"
                src="https://c.ndtvimg.com/2023-01/m0dmrm58_spices_625x300_18_January_23.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350"
                alt="cat"
              />
            </div>
            <div className="about_child_container">
              <p className="about_title">
                About Atara{" "}
              </p>
              <p className="about_paragraph">
                {" "}
                Learn about all herbs and description{" "}
              </p>{" "}
            </div>{" "}
          </section>{" "}
          <section className="about_our_blog_container">
            <div className="about_title_blog">
              <h2 className="ourBloc_title">New Arrivals</h2>{" "}
            </div>{" "}
            <div className="about_mission_container">
              {" "}
              {arrayArrival.map((item, index) => (
                <div className="mission_box " key={index}>
                  {" "}
                  <img
                    className="about_img"
                    src={item.src}
                    alt={item.alt}
                  />{" "}
                  <span className="pay-value">{item.price}</span>{" "}
                  <div className="product-category">
                    {" "}
                    <span className="product-name">{item.name}</span>{" "}
                    <span className="category-name">{item.category}</span>{" "}
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
export default newProduct;