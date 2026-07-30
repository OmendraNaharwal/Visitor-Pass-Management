// statistics card

import "./../../styles/dashboard.css";

function StatCard({

    title,
    value,
    icon,
    change,
    changeType = "positive",

}) {

    return (

        <div className="stat-card">

            {/* top */}

            <div className="stat-top">

                <div className="stat-icon">

                    {icon}

                </div>

                <span
                    className={
                        changeType === "positive"
                            ? "stat-change positive"
                            : "stat-change negative"
                    }
                >

                    {change}

                </span>

            </div>

            {/* number */}

            <h2 className="stat-value">

                {value}

            </h2>

            {/* title */}

            <p className="stat-title">

                {title}

            </p>

        </div>

    );

}

export default StatCard;