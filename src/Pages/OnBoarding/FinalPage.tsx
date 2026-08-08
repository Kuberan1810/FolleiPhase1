import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-[640px] flex flex-col items-center text-center">
        {/* Top Hero Icon Card */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 border border-purple-200/60 flex items-center justify-center shadow-sm relative mb-4 group transition-transform hover:scale-105">
          <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
            <Sparkles className="w-7 h-7" />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
          You're Ready.
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-md font-normal leading-relaxed">
          Your workspace has been created successfully. All systems are initialized and ready for your team.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-10">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2.5 bg-[#0F172A] hover:bg-black text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/onboarding/import-data')}
            className="px-6 py-2.5 bg-[#E2E8F0]/70 hover:bg-[#CBD5E1] text-[#0F172A] text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Import Your First Lead
          </button>
        </div>

        {/* Task Checklist Card */}
        <div className="w-full bg-[#F8FAFC] sm:bg-white rounded-2xl border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 sm:p-8 text-left relative overflow-hidden">
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0F172A] rounded-l-2xl" />

          {/* Card Header */}
          <div className="flex items-start justify-between mb-6 pl-2">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Finish setting up your workspace
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Complete these steps to get the most out of Follei.
              </p>
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#94A3B8] bg-gray-100 px-2.5 py-1 rounded-md">
              {completedCount} / {tasks.length} COMPLETED
            </span>
          </div>

          {/* Tasks List */}
          <div className="space-y-3.5 pl-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${task.completed
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : 'border-gray-200/80 bg-white hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Radio / Check Circle */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${task.completed
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-gray-300 bg-white'
                      }`}
                  >
                    {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  {/* Task Labels */}
                  <div>
                    <h4
                      className={`text-xs font-bold transition-all ${task.completed ? 'text-emerald-900' : 'text-[#0F172A]'
                        }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5 font-normal">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors ${task.completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-500'
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
