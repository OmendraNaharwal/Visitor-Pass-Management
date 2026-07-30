// main layout

import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import "../styles/layout.css";

function MainLayout() {

    return (

        <div className="layout">

            {/* sidebar */}

            <Sidebar />

            {/* right section */}

            <div className="layout-right">

                <Navbar />

                <main className="page-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;