import React, { useState } from 'react';
import { UserPlus, MessageSquare, Inbox, RefreshCw, Bell } from 'lucide-react';
import InsightCard from './components/InsightCard/InsightCard';
import EditActionDrawer from './components/Drawers/EditAction/EditActionDrawer';
import NewLeadDrawer from './components/Drawers/NewLead/NewLeadDrawer';
import SendMessageDrawer from './components/Drawers/SendMessage/SendMessageDrawer';
import NoResponseDrawer from './components/Drawers/NoResponse/NoResponseDrawer';
import UpdateStatusDrawer from './components/Drawers/UpdateStatus/UpdateStatusDrawer';
import ReplyReceivedDrawer from './components/Drawers/ReplyReceived/ReplyReceivedDrawer';
import NotifySalesDrawer from './components/Drawers/NotifySales/NotifySalesDrawer';
import WorkflowHeader from './components/Common/WorkflowHeader';
import ConnectorLine from './components/Common/ConnectorLine';

const FlowBuilder: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const [delayValue, setDelayValue] = useState(15);
  const [delayUnit, setDelayUnit] = useState('Minutes');
  const [isBusinessHoursOnly, setIsBusinessHoursOnly] = useState(true);

  const workflows = [
    {
      trigger: {
        id: 'new-lead',
        icon: UserPlus,
        title: "Order Completed",
        description: "Activate on purchase and delivery events",
        status: "1.2k Active"
      },
      action: {
        id: 'send-message',
        icon: MessageSquare,
        title: "Engage customer",
        description: "Automated personalized intro via email and calls.",
        status: "High Priority"
      }
    },
    {
      trigger: {
        id: 'no-response',
        icon: MessageSquare,
        title: "No Review",
        description: "Activates,after 3-5 if no feedback",
        status: "236 Waiting"
      },
      action: {
        id: 'update-status',
        icon: RefreshCw,
        title: "Send Reminder",
        description: "Follow up to collect feedback",
        status: "Syncing"
      }
    },
    {
      trigger: {
        id: 'reply-received',
        icon: Inbox,
        title: "Issue Raised",
        description: "Activates when support ticket is created",
        status: "105 Matches"
      },
      action: {
        id: 'notify-sales',
        icon: Bell,
        title: "Notify Support Team",
        description: "Instant alert via Email / Slack",
        status: "Instant"
      }
    }
  ];

  const handleCardClick = (id: string) => {
    setActiveDrawer(id);
  };

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <div className=" w-full min-h-screen font-['Manrope'] bg-[#F7F9FB] relative">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 ">
        <div>
          <h1 className="text-[28px] font-[700] text-[#0F172A] mb-2 tracking-tight">Customer Insights</h1>
          <p className="text-[14px] text-[#64748B] font-[500]">Define triggers and actions to automate your workflow</p>
        </div>
        <button
          onClick={() => setActiveDrawer('edit-action')}
          className="text-white rounded-[8px] text-[15px] font-[700] w-[148px] h-[40px] flex items-center justify-center transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)',
            boxShadow: '0 4px 6px -4px rgba(17, 98, 157, 0.2), 0 10px 15px -3px rgba(17, 98, 157, 0.2)'
          }}
        >
          Edit Action
        </button>
      </div>

      <div className="w-full">
        <WorkflowHeader />

        <div className="space-y-8 md:space-y-12">
          {workflows.map((workflow, index) => (
            <div key={index} className="flex flex-col md:grid md:grid-cols-[390px_1fr_390px] items-center gap-4 md:gap-0 w-full group">
              <div className="w-full flex justify-center md:justify-start">
                <InsightCard
                  {...workflow.trigger}
                  onClick={() => handleCardClick(workflow.trigger.id)}
                />
              </div>

              <ConnectorLine />

              <div className="w-full flex justify-center md:justify-end">
                <InsightCard
                  {...workflow.action}
                  onClick={() => handleCardClick(workflow.action.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditActionDrawer
        isOpen={activeDrawer === 'edit-action'}
        onClose={closeDrawer}
        delayValue={delayValue}
        setDelayValue={setDelayValue}
        delayUnit={delayUnit}
        setDelayUnit={setDelayUnit}
        isBusinessHoursOnly={isBusinessHoursOnly}
        setIsBusinessHoursOnly={setIsBusinessHoursOnly}
      />

      <NewLeadDrawer
        isOpen={activeDrawer === 'new-lead'}
        onClose={closeDrawer}
      />

      <SendMessageDrawer
        isOpen={activeDrawer === 'send-message'}
        onClose={closeDrawer}
      />

      <NoResponseDrawer
        isOpen={activeDrawer === 'no-response'}
        onClose={closeDrawer}
      />

      <UpdateStatusDrawer
        isOpen={activeDrawer === 'update-status'}
        onClose={closeDrawer}
      />

      <ReplyReceivedDrawer
        isOpen={activeDrawer === 'reply-received'}
        onClose={closeDrawer}
      />

      <NotifySalesDrawer
        isOpen={activeDrawer === 'notify-sales'}
        onClose={closeDrawer}
      />
    </div>
  );
};

export default FlowBuilder;
