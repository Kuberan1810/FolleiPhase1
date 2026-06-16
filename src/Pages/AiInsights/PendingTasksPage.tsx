import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { PhoneCall, PlayCircle, FileText, MoreVertical, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

type TaskType = 'call' | 'demo' | 'proposal';
type Priority = 'High' | 'Medium' | 'Critical';
type Status = 'Pending' | 'Scheduled' | 'Overdue';

interface Task {
  id: string;
  type: TaskType;
  leadName: string;
  company: string;
  priority: Priority;
  status: Status;
}

const mockTasks: Task[] = [
  { id: '1', type: 'call', leadName: 'Sarah Jenkins', company: 'Acme Corp', priority: 'High', status: 'Pending' },
  { id: '2', type: 'demo', leadName: 'Michael Chang', company: 'TechFlow Inc', priority: 'Critical', status: 'Overdue' },
  { id: '3', type: 'proposal', leadName: 'Emma Watson', company: 'Global Ind.', priority: 'Medium', status: 'Scheduled' },
  { id: '4', type: 'call', leadName: 'David Miller', company: 'Nexus Ltd', priority: 'Medium', status: 'Pending' },
  { id: '5', type: 'demo', leadName: 'Lisa Wong', company: 'CloudSync', priority: 'High', status: 'Scheduled' },
  { id: '6', type: 'proposal', leadName: 'Robert Fox', company: 'Starlight Co.', priority: 'Critical', status: 'Overdue' },
  { id: '7', type: 'call', leadName: 'Alice Smith', company: 'Nova Tech', priority: 'Medium', status: 'Scheduled' },
  { id: '8', type: 'proposal', leadName: 'John Doe', company: 'Alpha Group', priority: 'High', status: 'Pending' },
  { id: '9', type: 'demo', leadName: 'Kevin Hart', company: 'Beta Corp', priority: 'Medium', status: 'Scheduled' },
  { id: '10', type: 'call', leadName: 'Samantha Lee', company: 'Omega Inc', priority: 'Critical', status: 'Overdue' },
  { id: '11', type: 'proposal', leadName: 'Chris Evans', company: 'Stark Ind.', priority: 'High', status: 'Pending' }
];

const PendingTasksPage = () => {
  const [tasks] = useState<Task[]>(mockTasks);
  const [kebabOpenId, setKebabOpenId] = useState<string | null>(null);
  const [kebabPos, setKebabPos] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setKebabOpenId(null);
      }
    };
    if (kebabOpenId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [kebabOpenId]);

  const handleKebabClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (kebabOpenId === id) {
      setKebabOpenId(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setKebabPos({ top: rect.bottom, left: rect.left - 130 });
    setKebabOpenId(id);
  };

  const getTaskInfo = (type: TaskType) => {
    switch (type) {
      case 'call': 
        return { 
          icon: <PhoneCall size={18} color="#004370" />, 
          bg: 'bg-[#E5EEFF]', 
          line1: 'Follow-up', 
          line2: 'Call' 
        };
      case 'demo': 
        return { 
          icon: <PlayCircle size={18} color="#8127CF" />, 
          bg: 'bg-[#E5EEFF]', 
          line1: 'Product', 
          line2: 'Demo' 
        };
      case 'proposal': 
        return { 
          icon: <FileText size={18} color="#BA1A1A" />, 
          bg: 'bg-[#FFDAD6]', 
          line1: 'Proposal', 
          line2: 'Draft' 
        };
    }
  };

  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'text-[#703700] bg-[#FFDCC5]';
      case 'Medium': return 'text-[#1D4ED8] bg-[#DBEAFE]';
      case 'Critical': return 'text-[#93000A] bg-[#FFDAD6]';
    }
  };

  const getDueDate = (status: Status) => {
    switch (status) {
      case 'Pending':
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-manrope font-bold text-[16px] text-[#904900]">Today, 2 PM</span>
            <span className="font-manrope font-bold text-[16px] text-[#904900]">In 3 hours</span>
          </div>
        );
      case 'Scheduled':
        return (
          <span className="font-manrope font-normal text-[16px] text-[#191C1E]">Tomorrow</span>
        );
      case 'Overdue':
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-manrope font-bold text-[16px] text-[#BA1A1A]">2 Days</span>
            <span className="font-manrope font-bold text-[16px] text-[#BA1A1A]">Overdue</span>
          </div>
        );
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'Pending': 
        return <span className="rounded-full px-3 py-1 font-manrope font-bold text-[12px] tracking-[0.36px] text-[#464554] bg-[#FFF1E3]">{status}</span>;
      case 'Scheduled': 
        return <span className="rounded-full px-3 py-1 font-manrope font-bold text-[12px] tracking-[0.36px] text-[#004370]" style={{ backgroundColor: 'rgba(70, 72, 212, 0.1)' }}>{status}</span>;
      case 'Overdue': 
        return <span className="rounded-full px-3 py-1 font-manrope font-bold text-[12px] tracking-[0.36px] text-[#FFFFFF] bg-[#BA1A1A]">{status}</span>;
    }
  };

  return (
    <>
      <div className="flex items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] font-manrope">
            Pending Tasks
          </h1>
          <p className="text-[13px] md:text-base text-[#64748B] mt-1 font-regular font-inter">
            Track, prioritize, and complete all pending activities across your team.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left">
          <thead className="bg-[#F6FAFF]">
            <tr>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">TASK NAME</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">LEAD/COMPANY</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">PRIORITY</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">DUE DATE</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">STATUS</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tasks.slice(0, 10).map((task) => {
              const info = getTaskInfo(task.type);
              return (
                <tr key={task.id} className="bg-white transition-colors duration-200 hover:bg-[#F8FAFC]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-[29px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0 ${info.bg}`}>
                        {info.icon}
                      </div>
                      <span className="flex flex-col leading-tight font-manrope font-bold text-[16px] text-[#191C1E] tracking-[0px]">
                        <span>{info.line1}</span>
                        <span>{info.line2}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-manrope font-semibold text-[16px] leading-none text-[#0B1C30]">{task.leadName}</span>
                      <span className="font-manrope font-normal text-[16px] leading-none text-[#767586]">{task.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 font-manrope font-bold text-[12px] tracking-[0.36px] ${getPriorityStyle(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getDueDate(task.status)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={(e) => handleKebabClick(e, task.id)} className="cursor-pointer">
                      <MoreVertical size={18} color="#94A3B8" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-inter font-normal text-[13px] text-[#64748B]">Showing 1-10 of 11 tasks</span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-[#E2E8F0] text-[#64748B] rounded-[6px] opacity-40 cursor-not-allowed">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#004370] text-white rounded-[6px] font-inter font-medium text-[13px] cursor-pointer">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-[#E2E8F0] text-[#64748B] rounded-[6px] hover:bg-[#F8FAFC] transition-colors cursor-pointer font-inter font-medium text-[13px]">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-[#E2E8F0] text-[#64748B] rounded-[6px] hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {kebabOpenId && ReactDOM.createPortal(
        <div 
          ref={dropdownRef}
          style={{ position: 'fixed', top: kebabPos.top, left: kebabPos.left, zIndex: 999 }}
          className="bg-white rounded-[8px] shadow-lg w-[160px] py-1"
        >
          <button className="w-full flex items-center gap-2 px-4 py-2 font-inter font-medium text-[14px] text-[#191C1E] hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <Eye size={14} color="#191C1E" /> View Details
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 font-inter font-medium text-[14px] text-[#191C1E] hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <Pencil size={14} color="#191C1E" /> Edit Task
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 font-inter font-medium text-[14px] text-[#BA1A1A] hover:bg-[#FFF1F0] transition-colors cursor-pointer">
            <Trash2 size={14} color="#BA1A1A" /> Delete
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

export default PendingTasksPage;
