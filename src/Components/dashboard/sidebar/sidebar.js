import "./sidebar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiChevronRight } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
// import { RxActivityLog } from "react-icons/rx";
import {MdProductionQuantityLimits} from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import {HiUserGroup} from "react-icons/hi"
import CategoryIcon from '@mui/icons-material/Category';
import logo from "./image/logoatara-removebg.png";
// import TablePagination from "../../../pages/Admin/admin"
import Cookies from 'universal-cookie';

const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <div className="head">
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>

            <div className="text-logo-text">
              <span className="name">Atara</span>
              <span className="profession">Online</span>
            </div>
          </div>
          <BiChevronRight className="toggle" onClick={handleToggleSidebar} />
        </div>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <NavLink to="/dashboard">
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/adminDashboard">
                  <AiOutlineUser className="icon" />
                  <span className="text nav-text">Admin</span>
                  {/* <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} /> */}

                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/userDashboard">
                  <HiUserGroup className="icon" />
                  <span className="text nav-text">Users</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/productDashboard">
                  <MdProductionQuantityLimits className="icon" />
                  <span className="text nav-text">Products</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/categoryDashboard">
                  <CategoryIcon className="icon" />
                  <span className="text nav-text">Category</span>
                </NavLink>
              </li>

              {/* <li className="nav-link">
                <NavLink to="/test">
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">anything</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/test">
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">anything</span>
                </NavLink>
              </li> */}
            </ul>
          </div>

          <div className="bottom-content">

            <li className="">
            <NavLink to="/loginAdmin" onClick={handleLogout}>
                <TbLogout className="icon" />
                <span className="text nav-text">Logout</span>
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

