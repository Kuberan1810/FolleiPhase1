import React, { useState, useRef } from 'react';
import {
  Pin,
  Pencil,
  Trash2,
  Bold,
  Italic,
  List,
  Paperclip,
  AtSign,
  PinOff,
  X
} from 'lucide-react';


interface NoteItem {
  id: string;
  author: string;
  avatarColor: string;
  avatarChar: string;
  time: string;
  content: string;
  isPinned?: boolean;
  attachedFile?: { name: string; size: string };
}

const renderFormattedContent = (content: string) => {
  const lines = content.split('\n');
  let insideList = false;
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-extrabold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith('- ')) {
      if (!insideList) {
        insideList = true;
        listItems = [];
      }
      listItems.push(
        <li key={`li-${index}`} className="list-disc ml-5 pl-1 text-[15px]">
          {parseInline(line.trim().slice(2))}
        </li>
      );
    } else {
      if (insideList) {
        elements.push(
          <ul key={`ul-${index}`} className="my-2 space-y-1">
            {listItems}
          </ul>
        );
        insideList = false;
      }
      elements.push(
        <p key={`p-${index}`} className="min-h-[1.2em]">
          {parseInline(line)}
        </p>
      );
    }
  });

  if (insideList) {
    elements.push(
      <ul key={`ul-end`} className="my-2 space-y-1">
        {listItems}
      </ul>
    );
  }

  return <div className="space-y-1">{elements}</div>;
};

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
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyFormat = (type: 'bold' | 'italic' | 'list' | 'mention') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacementText = '';
    let cursorOffset = 0;

    if (type === 'bold') {
      replacementText = `**${selectedText}**`;
      cursorOffset = selectedText ? replacementText.length : 2;
    } else if (type === 'italic') {
      replacementText = `*${selectedText}*`;
      cursorOffset = selectedText ? replacementText.length : 1;
    } else if (type === 'list') {
      if (selectedText) {
        replacementText = selectedText
          .split('\n')
          .map(line => line.startsWith('- ') ? line : `- ${line}`)
          .join('\n');
      } else {
        replacementText = '- ';
      }
      cursorOffset = replacementText.length;
    } else if (type === 'mention') {
      replacementText = `@${selectedText}`;
      cursorOffset = replacementText.length;
    }

    setNoteText(text.substring(0, start) + replacementText + text.substring(end));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInKB = Math.round(file.size / 1024);
    let sizeStr = `${sizeInKB} KB`;
    if (sizeInKB > 1024) {
      sizeStr = `${(sizeInKB / 1024).toFixed(1)} MB`;
    }

    setAttachedFile({
      name: file.name,
      size: sizeStr
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddNote = () => {
    if (!noteText.trim() && !attachedFile) return;

    const newNote: NoteItem = {
      id: Date.now().toString(),
      author: 'Sarah Jenkins',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarChar: 'SJ',
      time: 'Just now',
      content: noteText,
      attachedFile: attachedFile || undefined
    };

    setNotes([newNote, ...notes]);
    setNoteText('');
    setAttachedFile(null);
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
    <div className="w-full flex flex-col gap-6 font-manrope">
      {/* Add Note Card */}
      <div className="w-full bg-white rounded-[16px] border-[1px] border-[#C7C4D7] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 bg-indigo-100 text-indigo-700">
            SJ
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="rounded-[14px] overflow-hidden bg-[#EFF4FF] flex flex-col">
              <textarea
                ref={textareaRef}
                className="w-full p-4 min-h-[100px] border-none bg-transparent outline-none text-[14px] text-slate-700 placeholder-slate-400 font-manrope resize-y"
                placeholder="Add meeting notes, follow-up updates..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              {attachedFile && (
                <div className="flex items-center justify-between px-4 pb-3 text-xs text-slate-600 bg-blue-50/30 border-t border-blue-100/30">
                  <div className="flex items-center gap-2 font-manrope">
                    <Paperclip className="w-3.5 h-3.5 text-[#004370]" />
                    <span className="font-semibold text-[#004370]">{attachedFile.name}</span>
                    <span className="text-[10px] text-slate-400">({attachedFile.size})</span>
                  </div>
                  <button
                    onClick={() => setAttachedFile(null)}
                    className="p-1 hover:bg-slate-200/80 rounded-full border-none bg-transparent cursor-pointer text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center justify-between py-2">
              <div className='flex items-center gap-3 bg-[#F7F9FB] rounded-[10px] px-2.5 py-2'>
                <button
                  onClick={() => applyFormat('bold')}
                  className="text-[#464554] hover:text-[#004370] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center transition-colors"
                  title="Bold (**text**)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => applyFormat('italic')}
                  className="text-[#464554] hover:text-[#004370] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center transition-colors"
                  title="Italic (*text*)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => applyFormat('list')}
                  className="text-[#464554] hover:text-[#004370] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center transition-colors"
                  title="Bulleted List (- text)"
                >
                  <List className="w-4 h-4" />
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#464554] hover:text-[#004370] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center transition-colors"
                  title="Attach File"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  onClick={() => applyFormat('mention')}
                  className="text-[#464554] hover:text-[#004370] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center transition-colors"
                  title="Mention (@name)"
                >
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
          <div className="flex items-center gap-2 text-[14px] font-semibold text-[#464554] tracking-wider uppercase font-manrope">
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${note.avatarColor || 'bg-indigo-100 text-indigo-700'}`}>
                      {note.avatarChar || 'SJ'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#0B1C30] leading-none font-manrope">{note.author}</h4>
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
                  <>
                    <div className="mt-3.5 font-manrope text-[16px] leading-[24px] text-justify text-[#222222] whitespace-pre-wrap">
                      {renderFormattedContent(note.content)}
                    </div>
                    {note.attachedFile && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#004370] font-manrope">
                        <Paperclip className="w-3.5 h-3.5 text-[#004370]" />
                        <span>{note.attachedFile.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({note.attachedFile.size})</span>
                      </div>
                    )}
                  </>
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${note.avatarColor || 'bg-indigo-100 text-indigo-700'}`}>
                      {note.avatarChar || 'SJ'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#0B1C30] leading-none font-manrope">{note.author}</h4>
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
                  <>
                    <div className="mt-3.5 font-manrope text-[16px] leading-[24px] text-justify text-[#222222] whitespace-pre-wrap">
                      {renderFormattedContent(note.content)}
                    </div>
                    {note.attachedFile && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#004370] font-manrope">
                        <Paperclip className="w-3.5 h-3.5 text-[#004370]" />
                        <span>{note.attachedFile.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({note.attachedFile.size})</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
