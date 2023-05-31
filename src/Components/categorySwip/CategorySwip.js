import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

function CategorySwip() {
  const arrayCategories = [
    {
      src: "https://www.carolinescooking.com/wp-content/uploads/2022/01/Lebanese-seven-spices-baharat-featured-pic-sq.jpg",
      alt: "Category1",
      name: "Spices",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0265/2081/3616/collections/blur-breakfast-close-up-dairy-product-376464_1200x1200.jpg?v=1645275090",
      alt: "Category2",
      name: "Herbs",
    },
    {
      src: "https://images.immediate.co.uk/production/volatile/sites/30/2019/12/dates-fb2647e.jpg",
      alt: "Category3",
      name: "Dates",
    },
  ];

  const [categoryData, setCategoryData] = useState([]);

  const fetchProductData = async (categoryName) => {
    try {
      const response = await fetch(
        `https://atara-backend.onrender.com/product/products/category/${categoryName}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategoryData((prevData) => [
          ...prevData,
          { name: categoryName, data },
        ]);
      } else {
        console.error("Product data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    arrayCategories.forEach((category) => {
      fetchProductData(category.name);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <main id="slider">
      <section className="slider-container">
        <div className="slider">
          <h2 className="ourCategory">Our Categories</h2>
          <Slider {...settings} style={{ width: "100%", height: "100%" }}>
            {arrayCategories.map((category, index) => {
              const categoryDataItem = categoryData.find(
                (item) => item.name === category.name
              );
              const number = categoryDataItem
                ? categoryDataItem.data.length
                : 0;

              return (
                <NavLink
                  to={`/Product?category=${category.name}`}
                  className="slider-item"
                  key={index}
                >
                  <div className="slider-item">
                    <nav className="slide">
                      <figure className="slide-image">
                        <img
                          className="image-category"
                          src={category.src}
                          alt={category.alt}
                        />
                      </figure>
                      <h4 className="slide-name">{category.name}</h4>
                      <div className="custom-line"></div>
                      <div className="row-category">
                        <p className="numberName">Number of products</p>
                        <p className="numberPrice">{number}</p>
                      </div>
                    </nav>
                  </div>
                </NavLink>
              );
            })}
          </Slider>
        </div>
      </section>
    </main>
  );
}

export default CategorySwip;
