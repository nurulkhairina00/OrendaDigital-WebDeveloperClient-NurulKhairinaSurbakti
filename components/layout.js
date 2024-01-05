import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

function Layout(props) {
  const { data: session } = useSession();
  const [statusSidebar, setStatusSidebar] = useState(false);

  const toggle = () => setStatusSidebar(!statusSidebar);
  const logoutHandler = () => signOut({ callbackUrl: "/" });

  return (
    <Fragment>
      <div className="wrapper">
        {/* Sidebar   */}
        {session && <Sidebar status={statusSidebar} />}

        {/* Page Content */}
        <div id={session ? "content" : "content-login"}>
          {session && <Navbar toggle={toggle} logoutHandler={logoutHandler} />}
          <div
            className={session ? "main-content" : "main-content login-wrapper"}
          >
            {props.children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
