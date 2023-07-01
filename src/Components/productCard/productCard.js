import React, { useState, useEffect } from "react";
import "./productCard.css";
import Loader from "../loader/loader.js";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductCard = () => {
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://atara-backend.onrender.com/product/products`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      setFilteredProductData(
        productData.filter((product) => {
          if (activeButton === "Herbs") {
            return product.category && product.category === "Herbs";
          } else if (activeButton === "Spices") {
            return product.category && product.category === "Spices";
          } else if (activeButton === "Dates") {
            return product.category && product.category === "Dates";
          }
          return true;
        })
      );
    }
  }, [productData, activeButton]);

  const filterProducts = (category) => {
    setActiveButton(category);
    setLoading(true);
    fetch(
      `https://atara-backend.onrender.com/product/products/category/${category}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredProductData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });

    // Update the URL directly
    window.history.pushState(null, null, `/Product/${category}`);
  };

  const updateLocalStorage = (updateItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updateItems));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    Swal.fire({
      icon: "success",
      title: "Product Added",
      text: "The product has been added to the cart.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCart(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <>
      <div className="buttons-product">
        <button
          className={activeButton === "Herbs" ? "active" : ""}
          onClick={() => filterProducts("Herbs")}
        >
          Herbs
        </button>
        <button
          className={activeButton === "Spices" ? "active" : ""}
          onClick={() => filterProducts("Spices")}
        >
          Spice
        </button>
        <button
          className={activeButton === "Dates" ? "active" : ""}
          onClick={() => filterProducts("Dates")}
        >
          Date
        </button>
      </div>
      <div className="product-cardss">
        {loading ? (
          <Loader />
        ) : (
          filteredProductData.map((product, index) => (
            <article key={index} className="card">
              <div className="temporary_text">
                <img
                  src={`https://atara-backend.onrender.com/${product.image}`}
                  alt="Product"
                />
              </div>
              <div className="card_content">
                <span className="card_title">{product.name}</span>
                <p className="card_description">{product.description}</p>
                <div className="price-icon">
                  <p className="card_price">Price: {product.price}/g</p>
                  <FaCartPlus
                    className="cart-icon"
                    onClick={() => addToCart(product)}
                  />
                </div>
                <p className="card_note">Note: {product.note}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
};

export default ProductCard;
