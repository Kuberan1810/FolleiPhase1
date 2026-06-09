import React, { useState } from 'react';
import {
  Pin,
  Pencil,
  Trash2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Paperclip,
  AtSign,
  PinOff
} from 'lucide-react';
import avatarImg from '../../../../assets/avatar.png';

interface NoteItem {
  id: string;
  author: string;
  avatarColor: string;
  avatarChar: string;
  time: string;
  content: string;
  isPinned?: boolean;
}

export const NotesTabContent: React.FC = () => {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'pinned-1',
      author: 'Sarah Jenkins',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarChar: 'SJ',
      time: '2h ago',
      content: "Client is evaluating budget for Q1 rollout. Confirmed during yesterday's catch-up. They need a finalized proposal by Friday to include in the steering committee meeting.",
      isPinned: true
    },
    {
      id: '1',
      author: 'Sarah Jenkins',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarChar: 'SJ',
      time: '2h ago',
      content: 'Customer requested Premium Plan details. They are specifically interested in the multi-region data sovereignty features for their European branches.'
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatarColor: 'bg-emerald-100 text-emerald-700',
      avatarChar: 'MC',
      time: '3h ago',
      content: 'Technical deep-dive scheduled for next Tuesday. CTO wants to see the API throughput metrics and sandbox environment setup.'
    }
  ]);

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const newNote: NoteItem = {
      id: Date.now().toString(),
      author: 'Sarah Jenkins',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarChar: 'SJ',
      time: 'Just now',
      content: noteText
    };

    setNotes([newNote, ...notes]);
    setNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null);
    }
  };

  const handleTogglePin = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const handleStartEdit = (id: string, currentText: string) => {
    setEditingNoteId(id);
    setEditingText(currentText);
  };

  const handleSaveEdit = (id: string) => {
    if (!editingText.trim()) return;
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content: editingText } : note
    ));
    setEditingNoteId(null);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
  };

  const pinnedNotesList = notes.filter(n => n.isPinned);
  const generalNotesList = notes.filter(n => !n.isPinned);

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      {/* Add Note Card */}
      <div className="w-full bg-white rounded-[16px] border-[1px] border-[#C7C4D7] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex gap-4">
          <img
            src={avatarImg}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />

          <div className="flex-1 flex flex-col gap-3">
            <div className="rounded-[14px] overflow-hidden bg-[#EFF4FF]">
              <textarea
                className="w-full p-4 min-h-[100px] border-none bg-transparent outline-none text-[14px] text-slate-700 placeholder-slate-400 font-manrope resize-y"
                placeholder="Add meeting notes, follow-up updates..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center justify-between py-2">
              <div className='flex items-center gap-3 bg-[#F7F9FB] rounded-[10px] px-2.5 py-2'>
                <button className="text-[#464554] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="text-[#464554] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="text-[#464554] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <List className="w-4 h-4" />
                </button>
                <button className="text-[#464554] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button className="text-[#464554] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="text-[#464554] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <AtSign className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddNote}
                className="px-6 py-2 bg-[#004370] hover:bg-[#00355a] text-white text-[16px] font-bold rounded-[12px] font-manrope cursor-pointer transition-colors"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Notes Section */}
      {pinnedNotesList.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-[#464554tracking-wider uppercase font-manrope">
            <Pin className="w-4 h-4 text-[#B55D00] fill-[#B55D00]" />
            <span>Pinned Notes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotesList.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-[16px] border border-[#EDE9FF] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.015)] relative overflow-hidden"
              >

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarImg}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover shrink-0 shadow-xs"
                    />
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#0B1C30] leading-none">{note.author}</h4>
                      <span className="text-[12px] text-[#0B1C30] font-manrope mt-1 block">{note.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#0B1C30]">
                    {/* Pin/Unpin button */}
                    <button
                      onClick={() => handleTogglePin(note.id)}
                      className="cursor-pointer border-none bg-transparent p-1 flex items-center justify-center"
                      title="Unpin Note"
                    >
                      <PinOff className="w-3.5 h-3.5 rotate-45" />
                    </button>
                    {/* Edit button */}
                    <button
                      onClick={() => handleStartEdit(note.id, note.content)}
                      className="cursor-pointer border-none bg-transparent p-1 flex items-center justify-center"
                      title="Edit Note"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className=" cursor-pointer border-none bg-transparent p-1 flex items-center justify-center"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {editingNoteId === note.id ? (
                  <div className="mt-3 flex flex-col gap-2">
                    <textarea
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-[13.5px] font-manrope text-slate-750 focus:outline-none focus:border-[#004370]"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-semibold rounded-md cursor-pointer border-none transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        className="px-3 py-1 bg-[#004370] hover:bg-[#00355a] text-white text-[12px] font-semibold rounded-md cursor-pointer border-none transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3.5 font-[#222222] text-[16px] leading-[24px] text-justify">
                    {note.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[14px] font-bold text-[#464554] tracking-wider uppercase font-manrope pl-1">
          Notes
        </h3>

        {generalNotesList.length === 0 ? (
          <div className="bg-white rounded-[20px] border-[1px] border-[#EDE9FF] p-8 text-center text-slate-400 font-manrope text-sm shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            No notes added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generalNotesList.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-[16px] border-[1px] border-[#EDE9FF] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarImg}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover shrink-0 shadow-xs"
                    />
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#0B1C30] leading-none">{note.author}</h4>
                      <span className="text-[12px] text-[#464554] font-manrope mt-1 block">{note.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#0B1C30]">
                    {/* Pin/Unpin button */}
                    <button
                      onClick={() => handleTogglePin(note.id)}
                      className=" cursor-pointer border-none bg-transparent p-1 flex items-center justify-center"
                      title="Pin Note"
                    >
                      <Pin className="w-3.5 h-3.5 text-[#0B1C30]" />
                    </button>
                    {/* Edit button */}
                    <button
                      onClick={() => handleStartEdit(note.id, note.content)}
                      className="cursor-pointer border-none bg-transparent p-1 flex items-center justify-center"
                      title="Edit Note"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="cursor-pointer border-none bg-transparent p-1 flex items-center justify-center"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {editingNoteId === note.id ? (
                  <div className="mt-3 flex flex-col gap-2">
                    <textarea
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-[13.5px] font-manrope text-slate-750 focus:outline-none focus:border-[#004370]"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-semibold rounded-md cursor-pointer border-none transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        className="px-3 py-1 bg-[#004370] hover:bg-[#00355a] text-white text-[12px] font-semibold rounded-md cursor-pointer border-none transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3.5 font-[#222222] text-[16px] leading-[24px] text-justify">
                    {note.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
