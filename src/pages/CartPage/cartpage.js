import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "./cartpage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);

  const updateLocalStorage = (updateItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updateItems));
  };

  const addItemToCart = (name, price) => {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.count++;
      setCart([...cart]);
      updateLocalStorage(cart);
    } else {
      const newItem = { name, price, count: 1 };
      setCart([...cart, newItem]);
      updateLocalStorage([...cart, newItem]);
    }
  };

  const removeItemFromCart = (name) => {
    const updatedCart = cart.map((item) => {
      if (item.name === name) {
        item.count--;
      }
      return item;
    });
    const filteredCart = updatedCart.filter((item) => item.count > 0);
    setCart(filteredCart);
    updateLocalStorage(filteredCart);
  };

  const removeItemFromCartAll = (name) => {
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    updateLocalStorage([]);
  };

  const setCountForItem = (name, count) => {
    if (!isNaN(count)) {
      const updatedCart = cart.map((item) => {
        if (item.name === name) {
          return { ...item, count };
        }
        return item;
      });
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalCart = cart
    .reduce((acc, item) => acc + parseFloat(item.price) * item.count, 0)
    .toFixed(2);

  const orderNow = () => {
    const phoneNumber = "71994020";
    const message =
      "Hello, I would like to place an order. Here are my order details:\n\n";

    const orderItems = cart.map((item) => {
      return `${item.name} (${item.count}) - ${item.price}`;
    });

    const orderDetails = orderItems.join("\n");

    const totalPriceMessage = `Total Price: $${totalCart}`;
    const location = "please don't forget to send your location information"

    const encodedMessage = encodeURIComponent(
      `${message}\n${orderDetails}\n\n${totalPriceMessage}\n${location}`
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappLink);
  };

  return (
    <div>
      <nav className="navbar navbar-inverse bg-inverse fixed-top bg-faded">
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleCart}
            >
              Cart (<span className="total-count">{totalCount}</span>)
            </button>
            <button className="clear-cart btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="cart"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLabel">
                Cart
              </div>
            </div>
            <div className="modal-body">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <div className="input-group">
                            <input
                              type="number"
                              min="0"
                              className="item-count form-control"
                              value={item.count}
                              onChange={(e) =>
                                setCountForItem(
                                  item.name,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeItemFromCartAll(item.name)}
                            sx={{
                              backgroundColor: "#ee992c", // Set the background color
                              "&:hover": {

                                color: "#ee992c", // Set the hover text color
                                backgroundColor: "#006226", // Set the hover background color
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="total-price-cart">Total price: {totalCart} $</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={orderNow}
              >
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
