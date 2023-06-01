import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';

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
  return (
    <BrowserRouter>
    
      
      <Routes>
      <Route path="/" element={<Visitor />}>
    <Route path="/login" element={<Login />} />
    <Route path='/loginAdmin' element={<LoginAdmin/>}/>
    <Route path="/Product" element={<ProductCard />} />
    <Route path="/Category" element={<CategoryHome />} />
    <Route path="/cartPage" element={<CartPage />} />
    <Route path='/aboutUs' element={<AboutUs />} />
    <Route path="/" element={<HomePage />} />

    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Route>


        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<Admin />} />
        <Route path="/userDashboard" element={<User />} />
        <Route path="/categoryDashboard" element={<Category />} />
        <Route path="/productDashboard" element={<Product />} />

        <Route path='*' element={<VisitorRouteWrapper/>}/>

      </Routes>
     
    
    </BrowserRouter>
  );
};

function VisitorRouteWrapper() {
  return (
    <>

    </>
  );
}

function DashboardWrapper() {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/dashboard/Admin" element={<Admin />} />
      <Route path="/dashboard/Product" element={<Product />} />

    </Routes>
  );
}


export default App;
