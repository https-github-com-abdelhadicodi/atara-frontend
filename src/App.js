import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useCookies } from 'react-cookie';

import Product from './pages/products/product.js';
import Sidebar from './Components/dashboard/sidebar/sidebar.js';
import Admin from './pages/Admin/admin.js';
import User from './pages/user/user.js';
import Category from './pages/Category/category.js';
import Login from './Components/login/login.js';
import ProductCard from "./Components/productCard/productCard.js"
import CategoryHome from "./Components/CategoryHome/categoryhome.js"
import Visitor from './Route/Visitor/visitor.js';
import CartPage from './pages/CartPage/cartpage.js';
import Dashboard from './Components/dashboard/home/dashboard.js';
import HomePage from './pages/HomePage/homepage.js';
import NotFound from './pages/404page/NotFound.js';
import AboutUs from './pages/aboutus/aboutUs.js';
import LoginAdmin from './Components/login/loginAdmin.js';

const App = () => {
  const [cookies] = useCookies(['token']);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Visitor />}>
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/Product" element={<ProductCard />} />
          <Route path="/Category" element={<CategoryHome />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>

        <Route
  path="/sidebar"
  element={cookies.token ? <Sidebar /> : <Navigate to="/" replace />}
/>
<Route
  path="/dashboard"
  element={cookies.token ? <Dashboard /> : <Navigate to="/" replace />}
/>
<Route
  path="/adminDashboard"
  element={cookies.token ? <Admin /> : <Navigate to="/" replace />}
/>
<Route
  path="/userDashboard"
  element={cookies.token ? <User /> : <Navigate to="/" replace />}
/>
<Route
  path="/categoryDashboard"
  element={cookies.token ? <Category /> : <Navigate to="/" replace />}
/>
<Route
  path="/productDashboard"
  element={cookies.token ? <Product /> : <Navigate to="/" replace />}
/>
      </Routes>
    </Router>
  );
};

export default App;
