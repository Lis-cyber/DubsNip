import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { IoMdContact, IoMdClose } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { AiFillShopping } from "react-icons/ai";
import { SidebarContainer } from "./Sidebar_style";
import { useSelector } from "react-redux";

export default function Sidebar({ toggle, show }) {
  const user = useSelector(({ users }) => users.user);
  return (
    <SidebarContainer>
      <div
        onClick={toggle}
        className={show ? "close_container active" : "close_container"}
      ></div>
      <nav className={show ? "side_menu active" : "side_menu"}>
        <ul>
          <li onClick={toggle} className="close_btn">
            <span>
              <IoMdClose size="2rem" />
            </span>
          </li>
          <li>
            <Link onClick={toggle} to="/">
              <HiHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link onClick={toggle} to="/contact">
              <FaEnvelope />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link onClick={toggle} to="/team">
              <RiTeamFill />
              <span>Team</span>
            </Link>
          </li>
          <li>
            {!user ? null : (
              <Link onClick={toggle} to="/user/orders">
                <AiFillShopping />
                <span>Shopping history</span>
              </Link>
            )}
          </li>
        </ul>
        {/* pregunto si existe un usuario */}
        {!user ? (
          <Link to="/login" className="profile_btn">
            <div>Login</div>
          </Link>
        ) : user?.isAdmin ? (
          /*pregunto si el usuario es admin*/ <Link
            onClick={toggle}
            className="profile_btn"
            to="/admin"
          >
            <IoMdContact />
            <span>Admin</span>
          </Link>
        ) : (
          <Link onClick={toggle} className="profile_btn" to="/me">
            <IoMdContact />
            <span>Profile</span>
          </Link>
        )}
      </nav>
    </SidebarContainer>
  );
}
