import ActiveCustomers from "./ActiveCustomers"
import DashboardCard from "./DashboardCard"
import DashboardHeader from "./DashboardHeader"
import LiveActivity from "./LiveActivity"

const DashboardLayout = () => {
    return (

        <div className="flex flex-col gap-8">
            <DashboardHeader />
            <DashboardCard />
            <ActiveCustomers />
            <LiveActivity />
        </div>
    )
}

export default DashboardLayout