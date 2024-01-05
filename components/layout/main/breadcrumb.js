import React from "react";
import Link from "next/link";
import { FaHome, FaBars } from "react-icons/fa";

const Breadcrumb = (props) => {
  const { breadcrumbData } = props;
  return (
    <div className="row">
      <div className="col-auto">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent py-2 mt-1 mb-0">
            <li className="breadcrumb-item">
              <Link href="/">
                <FaHome className="text-danger" />
              </Link>
            </li>
            {breadcrumbData.map((item, i) => (
              <li
                className={
                  breadcrumbData.length == i + 1
                    ? "breadcrumb-item active"
                    : "breadcrumb-item"
                }
                key={i}
              >
                {breadcrumbData.length == i + 1 ? (
                  <span className="text-black">{item.label}</span>
                ) : (
                  <Link href={item.link}>
                    <a className="text-black pointer">{item.label}</a>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
