import React, { useState } from "react";
import { FaUserAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import Link from "next/link";

const Sidebar = (props) => {
  const { status } = props;
  const menuItem = [
    {
      path: "/customer",
      name: "Customer",
      icon: <FaUserAlt />,
    },
    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/order",
      name: "Order",
      icon: <FaThList />,
    },
  ];
  return (
    <nav id="sidebar" className={status ? "active" : ""}>
      <div className="sidebar-header py-4">
        <h5>
          <center>Orenda Digital</center>
        </h5>
      </div>

      <ul className="list-unstyled">
        {menuItem.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.path}>
                <a className="link-sidebar">
                  {item.icon}
                  <span className="ms-2">{!status && item.name}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
