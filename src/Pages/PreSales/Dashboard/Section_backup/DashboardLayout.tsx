import DashboardCard from "./DashboardLeads"
import DashboardHeader from "./DashboardHeader"

const DashboardLayout = () => {
    return (

        <div className="flex flex-col gap-8">
            <DashboardHeader />
            <DashboardCard />
           
          
        </div>
    )
}

export default DashboardLayout