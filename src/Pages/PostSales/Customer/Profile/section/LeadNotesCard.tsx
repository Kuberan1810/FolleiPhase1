import React, { useState } from 'react';

const LeadNotesCard: React.FC = () => {
  const [notes, setNotes] = useState([
    {
      text: 'Renewal discussion started. They are looking for an additional 10 seats for the EMEA expansion.',
      author: 'Sarah Wilson',
      date: '14 Jan 2026, 10:15 AM'
    }
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + today.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    setNotes([
      {
        text: newNote,
        author: 'You',
        date: formattedDate
      },
      ...notes
    ]);
    setNewNote('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  return (
    <div className="bg-white border border-[#EDF3FD] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col gap-4">
      <h3 className="text-[14px] font-bold text-[#0D1C2E] uppercase tracking-wider">Lead Notes</h3>

      {/* Note input area */}
      <div className="flex items-center justify-between border border-[#EFF7FF] rounded-[12px] p-[3px] pl-4 pr-[6px] bg-[#FCFDFE] h-[55px] focus-within:ring-1 focus-within:ring-[#007BFF] transition-all">
        <textarea
          rows={1}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a note ........."
          className="flex-1 bg-transparent resize-none text-[13px] text-slate-800 placeholder-[#94A3B8] placeholder:font-medium focus:outline-none py-3.5 h-full"
        />
        <button
          onClick={handleAddNote}
          className="bg-[#004370] hover:bg-[#003152] text-white font-medium text-[14px] px-6 py-2.5 rounded-[12px] transition-colors cursor-pointer shrink-0 h-[49px] flex items-center justify-center"
        >
          Add Note
        </button>
      </div>

      {/* Notes list */}
      <div className="flex flex-col gap-3 max-h-[160px] overflow-y-auto no-scrollbar">
        {notes.map((note, i) => (
          <div key={i} className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-[8px] p-4 flex flex-col gap-2 shadow-[0_1px_5px_rgba(237,243,253,0.05)]">
            <p className="text-[12px] text-[#475569] leading-relaxed">
              &ldquo;{note.text}&rdquo;
            </p>
            <span className="text-[10px] text-[#94A3B8] font-medium self-start">
              {note.author}  •  {note.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadNotesCard;
