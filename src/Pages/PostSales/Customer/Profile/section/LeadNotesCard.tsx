import { useState } from 'react';

const LeadNotesCard = ({ lead }: { lead?: any }) => {
  const [noteText, setNoteText] = useState(lead?.notes || "Renewal discussion started. They are looking for an additional 10 seats for the EMEA expansion.");
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(noteText);
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {
    setNoteText(tempText);
    setIsEditing(false);
    if (lead) {
      lead.notes = tempText;
    }
  };

  const handleAddNote = () => {
    if (inputValue.trim()) {
      setNoteText(inputValue);
      setInputValue('');
      if (lead) {
        lead.notes = inputValue;
      }
    }
  };

  return (
    <div className="BoxStyle">
      <h2 className="text-[20px] font-bold text-[#191C1E] mb-7">Lead Notes</h2>

      <div className="flex flex-col gap-5">
        {!isEditing && (
          <div className="relative">
            <input
              type="text"
              placeholder="Add a note..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddNote();
                }
              }}
              className="w-full bg-[#FCFDFE] border border-[#EDF3FD] rounded-[16px] py-5 pl-5 pr-28 text-[13px] font-medium text-[#191C1E] placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-base placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#004370]"
            />
            <button 
              onClick={handleAddNote}
              className="absolute right-2 top-2 bottom-2 bg-[#004370] text-white px-4 sm:px-6 py-2 rounded-[12px] text-[13px] sm:text-[14px] font-medium hover:bg-[#003152] transition-colors shadow-xs cursor-pointer"
            >
              Add Note
            </button>
          </div>
        )}

        <div className="bg-[#EFF6FF] rounded-[16px] p-5">
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <textarea
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                className="w-full bg-white border border-[#EDF3FD] rounded-[12px] p-3 text-[15px] sm:text-[16px] font-medium text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#004370] min-h-[100px] resize-none"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 rounded-[8px] border border-[#EDF3FD] bg-white hover:bg-slate-50 text-[13px] sm:text-[14px] font-semibold text-[#64748B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-[8px] bg-[#004370] hover:bg-[#003152] text-[13px] sm:text-[14px] font-semibold text-white cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5 sm:gap-4">
                <p className="text-[14px] sm:text-[16px] text-[#475569] font-medium leading-relaxed flex-1">
                  "{noteText}"
                </p>
                <button
                  onClick={() => {
                    setTempText(noteText);
                    setIsEditing(true);
                  }}
                  className="text-[13px] sm:text-[14px] font-semibold text-[#004370] hover:text-[#003152] cursor-pointer transition-colors self-end sm:self-auto shrink-0"
                >
                  Edit Note
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-[13px] md:text-[14px] font-medium text-[#94A3B8]">
                <span>Sarah Wilson</span>
                <span className="w-1 h-1 rounded-full bg-[#94A3B8] shrink-0" />
                <span>14 Jan 2026, 10:15 AM</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadNotesCard;
