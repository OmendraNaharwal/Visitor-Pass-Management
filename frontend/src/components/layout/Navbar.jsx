// navbar

import { FiBell } from "react-icons/fi";

function Navbar() {

    return (

        <header className="navbar">

            <div>

                <h2>Dashboard</h2>

            </div>

            <div className="navbar-right">

                <input

                    type="text"

                    placeholder="Search..."

                />

                <FiBell className="bell-icon" />

                <div className="profile">

                    <img

                        src="https://i.pravatar.cc/40"

                        alt="profile"

                    />

                    <span>

                        Admin

                    </span>

                </div>

            </div>

        </header>

    );

}

export default Navbar;