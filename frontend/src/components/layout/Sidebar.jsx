// sidebar

import { NavLink } from "react-router-dom";

import {

    FiHome,
    FiUsers,
    FiCalendar,
    FiCreditCard,
    FiBarChart2,
    FiUser,
    FiLogOut

} from "react-icons/fi";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="logo">

                <h2>VPM</h2>

                <span>Visitor Pass</span>

            </div>

            <nav>

                <NavLink to="/dashboard">

                    <FiHome />

                    Dashboard

                </NavLink>

                <NavLink to="/visitors">

                    <FiUsers />

                    Visitors

                </NavLink>

                <NavLink to="/appointments">

                    <FiCalendar />

                    Appointments

                </NavLink>

                <NavLink to="/passes">

                    <FiCreditCard />

                    Passes

                </NavLink>

                <NavLink to="/reports">

                    <FiBarChart2 />

                    Reports

                </NavLink>

                <NavLink to="/profile">

                    <FiUser />

                    Profile

                </NavLink>

            </nav>

            <button className="logout-btn">

                <FiLogOut />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;