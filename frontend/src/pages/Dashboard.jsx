import { FiUsers } from "react-icons/fi";
import StatCard from "../components/dashboard/StatCard";

function Dashboard() {

    return (

        <div className="stats-grid">

            <StatCard
                title="Total Visitors"
                value="120"
                icon={<FiUsers />}
                change="+12%"
            />

        </div>

    );

}

export default Dashboard;