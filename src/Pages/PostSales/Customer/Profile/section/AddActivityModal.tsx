import React from 'react';
import { Calendar, X, Clock, Bold, Italic, List, Paperclip, Bell } from 'lucide-react';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: any) => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');
  const [notes, setNotes] = React.useState('');
  const [reminder, setReminder] = React.useState('1 HOUR');

  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDate('12/12/2026');
      setTime('02:30 PM');
      setPriority('Medium');
      setNotes('');
      setReminder('1 HOUR');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Generate a new activity object based on the input
    const newActivity = {
      id: Date.now(),
      title: title || 'New Activity',
      time: 'Today • ' + time, // Simplified for now
      icon: Calendar,
      iconBg: priority === 'High' ? 'bg-[#FFEDED]' : priority === 'Medium' ? 'bg-[#EAF2FF]' : 'bg-[#F1F5F9]',
      iconColor: priority === 'High' ? 'text-[#F23D3D]' : priority === 'Medium' ? 'text-[#004370]' : 'text-[#64748B]',
      iconFill: priority === 'High' ? '#F23D3D' : priority === 'Medium' ? '#004370' : '#64748B',
      badge: {
        text: priority + ' Priority',
        bg: priority === 'High' ? 'bg-[#F23D3D10]' : priority === 'Medium' ? 'bg-[#00437010]' : 'bg-[#64748B10]',
        color: priority === 'High' ? 'text-[#F23D3D]' : priority === 'Medium' ? 'text-[#004370]' : 'text-[#64748B]'
      }
    };
    onSave(newActivity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-[600px] rounded-none sm:rounded-2xl shadow-xl overflow-hidden flex flex-col mx-0 sm:mx-4 animate-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EDF3FD] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#F1F5F9] rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#004370]" />
            </div>
            <h2 className="text-[22px] font-semibold text-[#004370]">New Activity</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors text-[#64748B] hover:text-[#1E293B]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 flex-1 sm:max-h-[48vh] overflow-y-auto scrollbar-thin">

          {/* Activity Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#64748B] tracking-wider uppercase">ACTIVITY TITLE</label>
            <input
              type="text"
              placeholder="e.g.,Demo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 px-4 border border-[#EDF3FD] rounded-xl text-[16px] text-[#1E293B] outline-none focus:border-[#004370] transition-colors"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#64748B] tracking-wider uppercase">DATE</label>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 border border-[#EDF3FD] rounded-xl text-[16px] text-[#1E293B] outline-none focus:border-[#004370] transition-colors cursor-pointer"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E293B]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#64748B] tracking-wider uppercase">TIME</label>
              <div className="relative">
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 border border-[#EDF3FD] rounded-xl text-[16px] text-[#1E293B] outline-none focus:border-[#004370] transition-colors cursor-pointer"
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E293B]" />
              </div>
            </div>
          </div>

          {/* Priority Level */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#64748B] tracking-wider uppercase">PRIORITY LEVEL</label>
            <div className="grid grid-cols-3 gap-3">
              {['High', 'Medium', 'Low'].map((level) => (
                <button
                  key={level}
                  onClick={() => setPriority(level)}
                  className={`h-12 rounded-xl text-[16px] font-medium transition-colors cursor-pointer ${priority === level
                      ? 'bg-[#004370] text-white border-transparent'
                      : 'bg-white text-[#1E293B] border border-[#EDF3FD] hover:bg-[#F8FAFC]'
                    }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Notes */}
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#64748B] tracking-wider uppercase">ACTIVITY NOTES</label>
              <div className="flex items-center gap-3 text-[#64748B]">
                <button className="hover:text-[#1E293B] transition-colors cursor-pointer"><Bold className="w-4 h-4" /></button>
                <button className="hover:text-[#1E293B] transition-colors cursor-pointer"><Italic className="w-4 h-4" /></button>
                <button className="hover:text-[#1E293B] transition-colors cursor-pointer"><List className="w-4 h-4" /></button>
                <button className="hover:text-[#1E293B] transition-colors cursor-pointer"><Paperclip className="w-4 h-4" /></button>
              </div>
            </div>
            <textarea
              placeholder="Add a note or @mention team member..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-4 border border-[#EDF3FD] rounded-xl text-[16px] text-[#1E293B] outline-none focus:border-[#004370] transition-colors resize-none"
            />
          </div>

          {/* Set Reminder */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#004370]" />
              <span className="text-[16px] font-semibold text-[#1E293B]">Set Reminder</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {['15 MIN', '1 HOUR', '1 DAY'].map((timeStr) => (
                <button
                  key={timeStr}
                  onClick={() => setReminder(timeStr)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${reminder === timeStr
                      ? 'bg-[#004370] text-white border-transparent'
                      : 'bg-white text-[#1E293B] border border-[#EDF3FD] hover:bg-[#F1F5F9]'
                    }`}
                >
                  {timeStr}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#EDF3FD] bg-[#F8FAFC] flex items-center justify-between">
          <button onClick={onClose} className="text-[16px] font-medium text-[#64748B] hover:text-[#1E293B] transition-colors px-4 cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-[#004370] text-white h-12 px-8 rounded-xl text-[16px] font-medium hover:bg-[#003152] transition-colors cursor-pointer">
            Saved
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddActivityModal;
