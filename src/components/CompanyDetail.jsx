import { useState } from 'react';
import './CompanyDetail.css';

const DEFAULT_STATUSES = [
  { id: 'es', name: 'ES/Webテスト', badge: 'badge-es' },
  { id: 'interview1', name: '一次面接', badge: 'badge-interview1' },
  { id: 'interview2', name: '二次面接', badge: 'badge-interview2' },
  { id: 'interview3', name: '三次面接', badge: 'badge-interview3' },
  { id: 'offer', name: '内定', badge: 'badge-offer' },
  { id: 'rejected', name: '不合格', badge: 'badge-rejected' },
];

function CompanyDetail({ company, onBack, onUpdate, onDelete, customStatuses, onAddCustomStatus }) {
  const [editedCompany, setEditedCompany] = useState({ ...company });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [newStatusName, setNewStatusName] = useState('');

  const allStatuses = [
    ...DEFAULT_STATUSES,
    ...customStatuses.map(s => ({ id: s.id, name: s.name, badge: 'badge-custom' }))
  ];

  const handleSave = () => {
    onUpdate(editedCompany);
    onBack();
  };

  const handleDelete = () => {
    onDelete(company.id);
    onBack();
  };

  const handleAddStatus = () => {
    if (!newStatusName.trim()) return;
    const newStatus = {
      id: `custom_${Date.now()}`,
      name: newStatusName.trim(),
    };
    onAddCustomStatus(newStatus);
    setEditedCompany({ ...editedCompany, status: newStatus.id });
    setNewStatusName('');
    setShowAddStatus(false);
  };

  return (
    <div className="company-detail">
      <div className="detail-header">
        <button className="btn btn-ghost" onClick={onBack}>
          ← 戻る
        </button>
        <h1>{company.name}</h1>
      </div>

      <div className="detail-content">
        <div className="card detail-form">
          <div className="form-group">
            <label>企業名</label>
            <input
              type="text"
              value={editedCompany.name}
              onChange={(e) => setEditedCompany({ ...editedCompany, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>ステータス</label>
            <div className="status-select-wrapper">
              <select
                value={editedCompany.status}
                onChange={(e) => setEditedCompany({ ...editedCompany, status: e.target.value })}
              >
                {allStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAddStatus(true)}
              >
                + 新規ステータス
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>締切 / 面接日</label>
            <input
              type="date"
              value={editedCompany.deadline || ''}
              onChange={(e) => setEditedCompany({ ...editedCompany, deadline: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>ESに書く内容メモ</label>
            <textarea
              value={editedCompany.memo || ''}
              onChange={(e) => setEditedCompany({ ...editedCompany, memo: e.target.value })}
              placeholder="志望動機、ガクチカ、自己PRなど、この企業用のメモを書いてください..."
              rows={10}
            />
          </div>

          <div className="detail-actions">
            <button className="btn btn-danger" onClick={() => setShowDeleteConfirm(true)}>
              削除
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              保存
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>削除確認</h2>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                ×
              </button>
            </div>
            <p>「{company.name}」を削除しますか？この操作は取り消せません。</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                キャンセル
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                削除する
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStatus && (
        <div className="modal-overlay" onClick={() => setShowAddStatus(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>新規ステータス追加</h2>
              <button className="modal-close" onClick={() => setShowAddStatus(false)}>
                ×
              </button>
            </div>
            <div className="form-group">
              <label>ステータス名</label>
              <input
                type="text"
                value={newStatusName}
                onChange={(e) => setNewStatusName(e.target.value)}
                placeholder="例: 最終面接、グループディスカッション"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddStatus(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleAddStatus}>
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDetail;
