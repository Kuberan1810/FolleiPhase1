import StatsGrid from './StatsGrid';
import CustomerHealth from './CustomerHealth';
import ChannelPerformance from './ChannelPerformance';
import NeedsAttention from './NeedsAttention';
import RenewalRevenue from './RenewalRevenue';
import FloatingButton from '../../../../Component/FloatingButton';

export default function DashboardLayout() {
    return (
        <div className="space-y-6 w-full pb-16 text-slate-800">
            {/* Upper Grid: Stats + Customer Health Rate + Channel Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <StatsGrid />
                <CustomerHealth />
                <ChannelPerformance />
            </div>

            {/* Lower Grid: Needs Attention + Renewal Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <NeedsAttention />
                <RenewalRevenue />
            </div>

            <FloatingButton />
        </div>
    );
}
