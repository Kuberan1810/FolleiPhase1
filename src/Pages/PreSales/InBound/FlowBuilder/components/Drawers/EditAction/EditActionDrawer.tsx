import React, { useState } from 'react';
import { X, MessageSquare, Mail, Phone, MessageCircle, Pen, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface EditActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  delayValue: number;
  setDelayValue: (val: number | ((prev: number) => number)) => void;
  delayUnit: string;
  setDelayUnit: (val: string) => void;
  isBusinessHoursOnly: boolean;
  setIsBusinessHoursOnly: (val: boolean) => void;
}

const EditActionDrawer: React.FC<EditActionDrawerProps> = ({
  isOpen,
  onClose,
  delayValue,
  setDelayValue,
  delayUnit,
  setDelayUnit,
  isBusinessHoursOnly,
  setIsBusinessHoursOnly,
}) => {
  const [templates, setTemplates] = useState(['Welcome Email - New Leads']);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [isDelayDropdownOpen, setIsDelayDropdownOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['SMS']);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const delayUnits = ['Minutes', 'Hours', 'Days'];

  const handleCreateTemplate = () => {
    if (newTemplateName.trim()) {
      setTemplates([...templates, newTemplateName.trim()]);
      setSelectedTemplateIndex(templates.length);
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
          onClick={() => {
            onClose();
            setIsDelayDropdownOpen(false);
          }}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="h-[92px] pt-[30px] px-[20px] flex justify-between items-start bg-white border-b border-[#5A5A5A]/20 rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight leading-none">Edit Action</h2>
              <p className="text-[#64748B] text-[13px] leading-none">Automation node</p>
            </div>
            <button
              onClick={onClose}
              className="w-[20px] h-[20px] bg-[#004370] rounded-full flex items-center justify-center transition-colors text-white mt-[-4px] cursor-pointer"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[20px] no-scrollbar">
            <div className="space-y-4">
              <div>
                <label className="text-[14px] font-[700] text-[#191C1E] block mb-2">Select Channel</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: MessageSquare, label: 'SMS' },
                    { icon: Mail, label: 'Email' },
                    { icon: Phone, label: 'Phone' },
                    { icon: MessageCircle, label: 'WhatsApp' }
                  ].map((item, i) => {
                    const isSelected = selectedChannels.includes(item.label);
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedChannels(prev =>
                            prev.includes(item.label)
                              ? prev.filter(c => c !== item.label)
                              : [...prev, item.label]
                          );
                        }}
                        className={`flex flex-col items-center justify-center gap-2.5 p-3 rounded-[10px] border-[2px] transition-all cursor-pointer
                          ${isSelected
                            ? 'border-[#004370] bg-[#F8FAFC] text-[#004370]'
                            : 'bg-white border-[#E2E8F0] text-[#595C5E] hover:bg-[#F8FAFC]'}`}
                      >
                        <div className="text-[#004370]">
                          <item.icon size={24} className={`w-[20px] h-[20px] rounded-[4px] p-1 ${isSelected ? 'bg-[#004370]/10' : 'bg-[#C1C7D1]/30'}`} />
                        </div>
                        <span className={`text-[12px] font-bold ${isSelected ? 'text-[#004370]' : 'text-[#595C5E]'}`}>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[14px] font-[700] text-[#191C1E]">Message Template</label>
                  <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="text-[13px] font-[700] text-[#1D7EBE] hover:underline cursor-pointer"
                  >
                    {isCreating ? 'Cancel' : 'Create New'}
                  </button>
                </div>

                {isCreating && (
                  <div className="flex gap-2 mb-4 bg-[#F8FAFC] p-2 rounded-[8px] border border-[#E2E8F0]">
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

                <div className="space-y-2">
                  {templates.map((template, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTemplateIndex(idx)}
                      className={`flex items-center justify-between p-3.5 border rounded-[8px] transition-all cursor-pointer group
                        ${selectedTemplateIndex === idx ? 'bg-[#F8FAFC] border-[#CBD5E1]' : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
                    >
                      {editingIndex === idx ? (
                        <div className="flex-1 flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            autoFocus
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateTemplateName(idx)}
                            onBlur={() => handleUpdateTemplateName(idx)}
                            className="flex-1 bg-white border border-[#CBD5E1] rounded-[4px] px-2 py-1 text-[14px] font-medium outline-none"
                          />
                          <Check
                            size={16}
                            className="text-[#1D7EBE] cursor-pointer"
                            onClick={() => handleUpdateTemplateName(idx)}
                          />
                        </div>
                      ) : (
                        <>
                          <span className="text-[14px] text-[#191C1E] font-medium">{template}</span>
                          <div className="flex items-center gap-3">
                            <Pen
                              size={16}
                              className={`text-[#64748B] transition-opacity ${selectedTemplateIndex === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditing(idx, template);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[14px] font-[700] text-[#191C1E] block mb-4">Delay before sending</label>
                <div className="flex gap-4">
                  <div className="flex-[0.4] relative flex border border-[#E2E8F0] rounded-[8px] bg-white group focus-within:border-[#004370] transition-all overflow-hidden">
                    <input
                      type="number"
                      value={delayValue}
                      onChange={(e) => setDelayValue(Number(e.target.value))}
                      className="w-full h-[46px] px-4 bg-transparent text-[14px] font-bold text-[#191C1E] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex flex-col w-[32px] shrink-0 ">
                      <button
                        onClick={() => setDelayValue(prev => (typeof prev === 'number' ? prev + 1 : prev))}
                        className="flex-1 flex items-center justify-center hover:bg-slate-50 transition-color text-[#64748B] hover:text-[#004370] cursor-pointer"
                      >
                        <ChevronUp size={12} strokeWidth={3} />
                      </button>
                      <button
                        onClick={() => setDelayValue(prev => (typeof prev === 'number' ? Math.max(0, prev - 1) : prev))}
                        className="flex-1 flex items-center justify-center hover:bg-slate-50 transition-colors text-[#64748B] hover:text-[#004370] cursor-pointer"
                      >
                        <ChevronDown size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <button
                      onClick={() => setIsDelayDropdownOpen(!isDelayDropdownOpen)}
                      className={`w-full h-[48px] px-4 rounded-[8px] bg-white border-[1.5px] flex items-center justify-between transition-all group hover:border-[#CBD5E1] ${isDelayDropdownOpen ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]' : 'border-[#E2E8F0]'}`}
                    >
                      <span className="text-[14px] text-[#191C1E] font-medium">{delayUnit}</span>
                      <ChevronDown size={20} className={`text-[#6B7280] transition-transform duration-200 ${isDelayDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDelayDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-[85]" onClick={() => setIsDelayDropdownOpen(false)} />
                        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-[90] py-1 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                          {delayUnits.map((unit) => (
                            <button
                              key={unit}
                              onClick={() => {
                                setDelayUnit(unit);
                                setIsDelayDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between group/item
                                ${delayUnit === unit
                                  ? 'bg-[#F1F5F9] text-[#191C1E] font-bold'
                                  : 'text-[#595C5E] hover:bg-[#F8FAFC]'}`}
                            >
                              <span className="text-[14px]">{unit}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setIsBusinessHoursOnly(!isBusinessHoursOnly)}
                      className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${isBusinessHoursOnly ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-200 ${isBusinessHoursOnly ? 'right-1' : 'left-1'}`} />
                    </div>
                    <span className="text-[14px] font-medium text-[#595C5E]">Send within business hours only</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-[48px] rounded-[10px] bg-[#F1F5F9] text-[#64748B] font-bold text-[15px] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 h-[48px] rounded-[10px] text-white font-bold text-[15px] shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  style={{
                    background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)',
                  }}
                  onClick={onClose}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditActionDrawer;
