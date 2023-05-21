import { useEffect, useState } from "react";
import Navbar from "./navBar";
import SidebarMenu from "./sideBar";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("user");
      } catch (e: any) {
        if (e.response.status === 401) {
          console.log("err", e);
          setRedirect(true);
        }
      }

      // setUser(data);
    };

    getUser();
  }, []);

  if (redirect) {
    window.location.href = "/login";
    // return <Navigate to="" />;
  }
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <SidebarMenu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
