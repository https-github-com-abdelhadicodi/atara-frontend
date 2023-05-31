import React, { useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (name, price, count) => {
    for (let item of cart) {
      if (item.name === name) {
        item.count++;
        setCart([...cart]);
        return;
      }
    }
    const item = { name, price, count };
    setCart([...cart, item]);
  };

  const removeItemFromCart = (name) => {
    for (let item of cart) {
      if (item.name === name) {
        item.count--;
        if (item.count === 0) {
          setCart(cart.filter((i) => i.name !== name));
        } else {
          setCart([...cart]);
        }
        break;
      }
    }
  };

  const removeItemFromCartAll = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const setCountForItem = (name, count) => {
    const updatedCart = cart.map((item) => {
      if (item.name === name) {
        return { ...item, count };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const displayCart = () => {
    return cart.map((item, index) => {
      const { name, price, count } = item;
      const total = (price * count).toFixed(2);

      return (
        <tr key={index}>
          <td>{name}</td>
          <td>({price})</td>
          <td>
            <div className="input-group">
              <button
                className="minus-item input-group-addon btn btn-primary"
                onClick={() => removeItemFromCart(name)}
              >
                -
              </button>
              <input
                type="number"
                className="item-count form-control"
                value={count}
                onChange={(e) =>
                  setCountForItem(name, parseInt(e.target.value))
                }
              />
              <button
                className="plus-item btn btn-primary input-group-addon"
                onClick={() => addItemToCart(name, price, 1)}
              >
                +
              </button>
            </div>
          </td>
          <td>
            <button
              className="delete-item btn btn-danger"
              onClick={() => removeItemFromCartAll(name)}
            >
              X
            </button>
          </td>
          <td>{total}</td>
        </tr>
      );
    });
  };

  const cartItems = displayCart();
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalCart = cart.reduce((acc, item) => acc + item.price * item.count, 0).toFixed(2);

  return (
    <div>
      <nav className="navbar navbar-inverse bg-inverse fixed-top bg-faded">
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#cart"
            >
              Cart (<span className="total-count">{totalCount}</span>)
            </button>
            <button className="clear-cart btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          {/* Render the items here */}
          {cartItems}
        </div>
      </div>

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
              <h5 className="modal-title" id="exampleModalLabel">
                Cart
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="show-cart table">{cartItems}</table>
              <div>
                Total price: $<span className="total-cart">{totalCart}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
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
