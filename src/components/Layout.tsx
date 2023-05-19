import Navbar from "./navBar";
import SidebarMenu from "./sideBar";

import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <SidebarMenu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
