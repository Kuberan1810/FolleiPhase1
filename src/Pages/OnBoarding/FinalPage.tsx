import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, Image } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
}

const initialTasks: ChecklistItem[] = [
  {
    id: 'connect-email',
    title: 'Connect Email',
    subtitle: 'Sync your inbox to track communications automatically.',
    completed: false,
  },
  {
    id: 'import-contacts',
    title: 'Import Contacts',
    subtitle: 'Bring in your existing leads via CSV or CRM integration.',
    completed: false,
  },
  {
    id: 'create-pipeline',
    title: 'Create Pipeline',
    subtitle: 'Customize your deal stages to match your sales process.',
    completed: false,
  },

];

const FinalPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<ChecklistItem[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[640px] flex flex-col items-center text-center">
        <div className="relative flex items-center justify-center mb-4">

          <div className="absolute w-64 h-84 rounded-[12px] bg-[#D0E1FB]/50 blur-[64px] pointer-events-none" />
          <div className="relative w-36 h-36 rounded-2xl bg-[#6056F0]/15 flex items-center justify-center group transition-transform hover:scale-105">
            <div className="w-14 h-14 flex items-center justify-center text-[#7168F6]">
              <Image className="w-5 h-4" />
            </div>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-[48px] font-bold text-[#191C1E] tracking-tight">
          You're Ready.
        </h1>
        <p className="text-[18px] text-[#444748] mt-2 max-w-md font-normal leading-relaxed">
          Your workspace has been created successfully. All systems are initialized and ready for your team.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-10">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2.5 bg-[#000000] hover:bg-black text-white text-[14px] font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/onboarding/import-data')}
            className="px-6 py-2.5 bg-[#E6E8EA] hover:bg-[#CBD5E1] text-[#191C1E] text-[14px] font-semibold transition-all cursor-pointer"
          >
            Import Your First Lead
          </button>
        </div>

        {/* Task Checklist Card */}
        <div className="w-full bg-[#ECEEF0] rounded-[8px] shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)] p-8 text-left relative overflow-hidden">
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#000000] rounded-l-[8px]" />

          {/* Card Header */}
          <div className="flex items-start justify-between mb-6 pl-2">
            <div>
              <h2 className="text-[24px] font-medium text-[#191C1E]">
                Finish setting up your workspace
              </h2>
              <p className="text-xs text-[#444748] mt-0.5">
                Complete these steps to get the most out of Follei.
              </p>
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#191C1E] bg-[#F7F9FB] px-2.5 py-1 rounded-[2px">
              {completedCount} / {tasks.length} COMPLETED
            </span>
          </div>

          {/* Tasks List */}
          <div className="space-y-3.5 pl-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 flex items-center justify-between transition-all cursor-pointer ${task.completed
                  ? ''
                  : ''
                  }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Radio / Check Circle */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ${task.completed
                      ? 'bg-emerald-600 text-[#F7F9FB]'
                      : 'border-2 border-gray-300 bg-[#F7F9FB]'
                      }`}
                  >
                    {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  {/* Task Labels */}
                  <div>
                    <h4
                      className={`text-[14] font-semibold transition-all ${task.completed ? 'text-emerald-900' : 'text-[#0F172A]'
                        }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-[14px] text-[#64748B] mt-0.5 font-normal">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[12px] font-semibold px-2.5 py-1 rounded-[2px] transition-colors ${task.completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-[#E0E3E5] text-[#444748]'
                    }`}
                >
                  {task.completed ? 'Done' : 'To do'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
