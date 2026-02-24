//Global layout wrapper.
// Provides shared UI structure such as header/navigation.

import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
