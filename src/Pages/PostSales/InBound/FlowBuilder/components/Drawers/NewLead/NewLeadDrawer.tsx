import React, { useState } from 'react';
import { X, MessageSquare, Mail, Phone, MessageCircle, Pen, Check } from 'lucide-react';

interface NewLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewLeadDrawer: React.FC<NewLeadDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedChannel, setSelectedChannel] = useState('SMS');
  const [isBusinessHoursOnly, setIsBusinessHoursOnly] = useState(true);

  const [templates, setTemplates] = useState([
    "Thank You Message (Post Purchase)",
    "Feedback Request (Post Delivery)"
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const channels = [
    { icon: MessageSquare, label: 'SMS' },
    { icon: Mail, label: 'Email' },
    { icon: Phone, label: 'Phone' },
    { icon: MessageCircle, label: 'WhatsApp' }
  ];

  const handleCreateTemplate = () => {
    if (newTemplateName.trim()) {
      setTemplates([...templates, newTemplateName.trim()]);
      setNewTemplateName('');
      setIsCreating(false);
    }
  };

  const handleUpdateTemplateName = (idx: number) => {
    if (editName.trim()) {
      const updated = [...templates];
      updated[idx] = editName.trim();
      setTemplates(updated);
      setEditingIndex(null);
    }
  };

  const startEditing = (idx: number, name: string) => {
    setEditingIndex(idx);
    setEditName(name);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out rounded-l-[10px] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">

          <div className="pt-[30px] px-[25px] flex justify-between items-start bg-white border-b border-[#E2E8F0] rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight leading-none">Order Completed</h2>
              <p className="text-[#64748B] text-[14px] leading-none mt-1">Automation node</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[20px] py-4 no-scrollbar bg-white">
            <div className="mb-8">
              <label className="text-[14px] font-[700] text-[#2C2F31] block mb-2">Select Channel</label>
              <div className="grid grid-cols-4 gap-3">
                {channels.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedChannel(item.label)}
                    className={`flex flex-col items-center justify-center gap-1.5 h-[64px] rounded-[8px] transition-all border-2
                      ${selectedChannel === item.label
                        ? 'border-[#004370] bg-[#F8FAFC] text-[#004370]'
                        : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'} cursor-pointer`}
                  >
                    <item.icon size={20} />
                    <span className="text-[8px] font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[14px] font-[700] text-[#2C2F31]">Message Template</label>
                <button
                  onClick={() => setIsCreating(!isCreating)}
                  className="text-[12px] font-[700] text-[#1D7EBE] hover:underline cursor-pointer"
                >
                  {isCreating ? 'Cancel' : 'Create New'}
                </button>
              </div>

              {isCreating && (
                <div className="flex gap-2 mb-4 bg-[#F8FAFC] p-2 rounded-[8px] border border-[#ABADAF]/20">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Template name..."
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateTemplate()}
                    className="flex-1 bg-white border border-[#E2E8F0] rounded-[6px] px-3 py-1.5 text-[14px] outline-none"
                  />
                  <button
                    onClick={handleCreateTemplate}
                    className="px-3 bg-[#1D7EBE] text-white text-[12px] font-bold rounded-[6px] cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {templates.map((template, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 bg-white border-[1px] rounded-[8px] transition-all cursor-pointer group
                      ${editingIndex === i ? 'border-[#ABADAF]/20' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
                  >
                    {editingIndex === i ? (
                      <div className="flex-1 flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          autoFocus
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleUpdateTemplateName(i)}
                          onBlur={() => handleUpdateTemplateName(i)}
                          className="flex-1 bg-white border border-[#ABADAF]/20 rounded-[4px] px-2 py-1 text-[14px] font-medium outline-none"
                        />
                        <Check
                          size={16}
                          className="text-[#1D7EBE] cursor-pointer"
                          onClick={() => handleUpdateTemplateName(i)}
                        />
                      </div>
                    ) : (
                      <>
                        <span className="text-[14px] font-medium text-[#2C2F31]">{template}</span>
                        <Pen
                          size={16}
                          className="text-[#595C5E] group-hover:text-[#1D7EBE]"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(i, template);
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[14px] font-[700] text-[#191C1E] block mb-4">Delay Settings</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white border-[1px] border-[#ABADAF]/20 rounded-[8px] hover:border-[#CBD5E1] transition-all cursor-pointer group">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-[#222222]">For Thank You:</span>
                    <span className="text-[10px] text-[#595C5E] font-medium">0-5 Minutes (Instant after purchase)</span>
                  </div>
                  <Pen size={16} className="text-[#64748B] group-hover:text-[#1D7EBE]" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-[8px] hover:border-[#CBD5E1] transition-all cursor-pointer group">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-[#222222]">For Feedback:</span>
                    <span className="text-[10px] text-[#595C5E] font-medium">Delivered + 2 Hours (or customizable)</span>
                  </div>
                  <Pen size={16} className="text-[#64748B] group-hover:text-[#1D7EBE]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-10">
              <div
                onClick={() => setIsBusinessHoursOnly(!isBusinessHoursOnly)}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${isBusinessHoursOnly ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-200 ${isBusinessHoursOnly ? 'right-1' : 'left-1'}`} />
              </div>
              <span className="text-[14px] font-medium text-[#595C5E]">Send within business hours only</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 h-[44px] rounded-[8px] bg-[#E6E8EA] text-[#414750] font-medium text-[16px] hover:bg-[#DEDFE1] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                className="flex-1 h-[44px] rounded-[8px] text-white font-medium text-[16px] shadow-sm hover:shadow-lg transition-all cursor-pointer"
                style={{ background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)' }}
                onClick={onClose}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLeadDrawer;
