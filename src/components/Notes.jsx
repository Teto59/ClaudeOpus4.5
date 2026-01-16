import { useState } from 'react';
import './Notes.css';

const DEFAULT_NOTES = [
  { id: 'jiko-pr', title: '自己PR', content: '' },
  { id: 'gakuchika', title: 'ガクチカ', content: '' },
  { id: 'shibou-douki', title: '志望動機テンプレート', content: '' },
];

function Notes({ notes, onUpdateNotes }) {
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const selectedNote = notes.find(n => n.id === selectedNoteId);

  const handleNoteChange = (content) => {
    const updatedNotes = notes.map(note =>
      note.id === selectedNoteId ? { ...note, content } : note
    );
    onUpdateNotes(updatedNotes);
  };

  const handleTitleChange = (title) => {
    const updatedNotes = notes.map(note =>
      note.id === selectedNoteId ? { ...note, title } : note
    );
    onUpdateNotes(updatedNotes);
  };

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;

    const newNote = {
      id: `note_${Date.now()}`,
      title: newNoteTitle.trim(),
      content: '',
    };

    onUpdateNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
    setNewNoteTitle('');
    setShowAddModal(false);
  };

  const handleDeleteNote = () => {
    const updatedNotes = notes.filter(n => n.id !== selectedNoteId);
    onUpdateNotes(updatedNotes);
    setSelectedNoteId(updatedNotes[0]?.id || null);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="notes">
      <div className="notes-sidebar">
        <div className="sidebar-header">
          <h3>メモ帳</h3>
          <button className="btn btn-ghost btn-icon" onClick={() => setShowAddModal(true)}>
            +
          </button>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${selectedNoteId === note.id ? 'active' : ''}`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <span className="note-icon">📄</span>
              <span className="note-title">{note.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="notes-content">
        {selectedNote ? (
          <>
            <div className="content-header">
              <input
                type="text"
                className="title-input"
                value={selectedNote.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="タイトル"
              />
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowDeleteConfirm(true)}
              >
                削除
              </button>
            </div>
            <textarea
              className="note-editor"
              value={selectedNote.content}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="ここにメモを書いてください...

例：
・自己PR: 私の強みは〇〇です...
・ガクチカ: 大学時代に〇〇に取り組み...
・よく使うフレーズ: 〇〇を通じて学んだことは..."
            />
          </>
        ) : (
          <div className="empty-state">
            <p>メモを選択するか、新しいメモを作成してください</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              + 新規メモ
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>新規メモ</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="form-group">
              <label>メモのタイトル</label>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="例: 業界研究、面接対策"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleAddNote}>
                作成
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>削除確認</h2>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                ×
              </button>
            </div>
            <p>「{selectedNote?.title}」を削除しますか？</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                キャンセル
              </button>
              <button className="btn btn-danger" onClick={handleDeleteNote}>
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Notes.defaultNotes = DEFAULT_NOTES;

export default Notes;
