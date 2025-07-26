import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function MainNavigation() {
  return (
    <>
     <Navbar />
     <div className="min-h-[55vh] pt-24">
        <Outlet />
     </div>
     
     <Footer />
    </>
  );
}
