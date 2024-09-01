import React from "react";
import InstructorHeader from "../components/Instructor/InstructorHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function InstructorLayout() {
  return (
    <>
      <header>
        <InstructorHeader />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default InstructorLayout;
