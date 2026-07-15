import React, { useState } from "react";
import { X, Calendar, Clock, Bell, List, Paperclip } from "lucide-react";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: { title: string; date: string; time: string; priority: "High" | "Medium" | "Low" }) => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("12/12/2026");
  const [time, setTime] = useState("02:30 PM");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState<"15 MIN" | "1 HOUR" | "1 DAY">("1 HOUR");
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, list: false });

  const checkFormat = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      list: document.queryCommandState('insertUnorderedList')
    });
  };

  React.useEffect(() => {
    if (editorRef.current && notes === "") {
      editorRef.current.innerHTML = "";
    }
  }, [notes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title,
      date,
      time,
      priority,
    });
    setTitle("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 overflow-y-auto animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-[#EDF3FD] shadow-2xl w-full max-w-[500px] flex flex-col p-6 animate-in zoom-in-95 duration-200 text-left relative my-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-[#464652] hover:text-[#1E293B]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#2E3192]/10 rounded-[12px] flex items-center justify-center text-[#004370]">
            <Calendar size={18} />
          </div>
          <h2 className="text-[20px] font-semibold text-[#004370]">New Activity</h2>
        </div>

        {/* Activity Title */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label className="text-[11px] font-semibold text-[#464652] uppercase tracking-wider">
            Activity Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Demo"
            className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#F3F4FC] rounded-[8px] text-[16px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#004370]/10 focus:border-[#004370] placeholder-[#94A3B8]"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[11px] font-semibold text-[#464652] uppercase tracking-wider">
              Date
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="12/12/2026"
                className="w-full pl-4 pr-10 py-2.5 bg-[#FFFFFF] border border-[#F3F4FC] rounded-[8px] text-[16px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#004370]/10 focus:border-[#004370]"
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[11px] font-semibold text-[#464652] uppercase tracking-wider">
              Time
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="02:50 PM"
                className="w-full pl-4 pr-10 py-2.5 bg-[#FFFFFF] border border-[#F3F4FC] rounded-[8px] text-[16px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#004370]/10 focus:border-[#004370]"
              />
              <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Priority Level */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label className="text-[11px] font-semibold text-[#464652] uppercase tracking-wider">
            Priority Level
          </label>
          <div className="flex gap-4">
            {(["High", "Medium", "Low"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`flex-1 py-2.5 border rounded-[8px] text-[14px] font-semibold cursor-pointer transition-colors text-center ${priority === level
                  ? "bg-[#004370] border-[#004370] text-white shadow-sm"
                  : "bg-white border-[#F3F4FC] text-[#191C1E] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Notes */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-semibold text-[#464652] uppercase tracking-wider">
              Activity Notes
            </label>
            <div className="flex items-center gap-2 text-[#64748B]">
              <button 
                type="button" 
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold', false, ''); checkFormat(); }} 
                className={`w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer font-bold text-sm ${activeFormats.bold ? 'bg-[#004370] text-white' : 'hover:bg-slate-100 hover:text-[#1E293B]'}`}
              >
                B
              </button>
              <button 
                type="button" 
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('italic', false, ''); checkFormat(); }} 
                className={`w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer italic font-serif text-sm ${activeFormats.italic ? 'bg-[#004370] text-white' : 'hover:bg-slate-100 hover:text-[#1E293B]'}`}
              >
                I
              </button>
              <button 
                type="button" 
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('insertUnorderedList', false, ''); checkFormat(); }} 
                className={`w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer ${activeFormats.list ? 'bg-[#004370] text-white' : 'hover:bg-slate-100 hover:text-[#1E293B]'}`}
              >
                <List size={14} />
              </button>
              <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
              <button 
                type="button" 
                className="w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer hover:bg-slate-100 hover:text-[#1E293B]"
              >
                <Paperclip size={14} />
              </button>
            </div>
          </div>
          <div className="relative w-full bg-[#FFFFFF] border border-[#F3F4FC] rounded-[16px] focus-within:ring-2 focus-within:ring-[#004370]/10 focus-within:border-[#004370] min-h-[90px] overflow-hidden flex flex-col">
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => { setNotes(e.currentTarget.innerHTML); checkFormat(); }}
              onKeyUp={checkFormat}
              onMouseUp={checkFormat}
              onFocus={checkFormat}
              className="w-full flex-1 px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none"
              style={{ minHeight: '90px' }}
            />
            {notes === "" && (
              <div className="absolute top-2.5 left-4 text-[#94A3B8] text-[14px] pointer-events-none">
                Add a note or @mention team member...
              </div>
            )}
          </div>
        </div>

        {/* Set Reminder */}
        <div className="flex items-center justify-between mb-4 rounded-[16px] p-4 font-semibold bg-[#F2F4F6]">
          <div className="flex items-center gap-2 text-[14px] text-[#1E293B]">
            <Bell className="w-4 h-4 text-[#004370]" />
            Set Reminder
          </div>
          <div className="flex gap-1.5">
            {(["15 MIN", "1 HOUR", "1 DAY"] as const).map((timeOption) => (
              <button
                key={timeOption}
                type="button"
                onClick={() => setReminder(timeOption)}
                className={`px-3 py-1.5 border rounded-full text-[10px] font-bold tracking-wider cursor-pointer transition-colors ${reminder === timeOption
                  ? "bg-[#004370] border-[#004370] text-white shadow-sm"
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
                  }`}
              >
                {timeOption}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#004370] hover:bg-[#003152] text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors shadow-sm"
          >
            Saved
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddActivityModal;
