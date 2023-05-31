import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Sidebar from "../sidebar/sidebar";
import Loader from "../../loader/loader.js";
import Chart from "./chart";

const Dashboard = () => {
  const [Loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [order, setOrder] = useState(0);
  const [lastFourUsers, setLastFourUsers] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchData(`https://atara-backend.onrender.com/user`),
      fetchData(`https://atara-backend.onrender.com/admin`),
      fetchData(`https://atara-backend.onrender.com/product/products`),
      fetchData(`https://atara-backend.onrender.com/order`),
    ])
      .then(([userData, adminData, productData, orderData]) => {
        // console.log('User API response:', userData);
        // console.log('Admin API response:', adminData);
        // console.log('Product API response:', productData);

        setUsers(userData.length);
        setAdmins(adminData.length);
        setProducts(productData.length);
        setOrder(orderData.length);
        setLastFourUsers(userData.slice(-4));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchData = async (url) => {
    // console.log('Fetching data from:', url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  return (
    <>
      <Sidebar />
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="dashboard">
            <div className="card-dashboard">
              <h2>Admins</h2>
              <h3>{admins}</h3>
            </div>
            <div className="card-dashboard">
              <h2>Users</h2>
              <h3>{users}</h3>
            </div>
            <div className="card-dashboard">
              <h2>Products</h2>
              <h3>{products}</h3>
            </div>
            <div className="card-dashboard">
              <h2>Order</h2>
              <h3>{order}</h3>
            </div>
         
          <div className="table-dashboard">
            <h2>Last 4 Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {lastFourUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="chart">
            <Chart />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
