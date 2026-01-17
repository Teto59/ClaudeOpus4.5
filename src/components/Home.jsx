import { useState } from 'react';
import './Home.css';

const DEFAULT_STATUSES = [
  { id: 'es', name: 'ES/Webテスト', badge: 'badge-es' },
  { id: 'interview1', name: '一次面接', badge: 'badge-interview1' },
  { id: 'interview2', name: '二次面接', badge: 'badge-interview2' },
  { id: 'interview3', name: '三次面接', badge: 'badge-interview3' },
  { id: 'offer', name: '内定', badge: 'badge-offer' },
  { id: 'rejected', name: '不合格', badge: 'badge-rejected' },
];

const APPLICATION_ROUTES = [
  { id: 'rikunabi', name: 'リクナビ', color: '#e60012' },
  { id: 'mynavi', name: 'マイナビ', color: '#00a0e9' },
  { id: 'mypage', name: '企業マイページ', color: '#4ade80' },
  { id: 'other', name: 'その他', color: '#9ca3af' },
];

function Home({ companies, onSelectCompany, onAddCompany, customStatuses }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    status: 'es',
    deadline: '',
    deadlineTime: '',
    starred: false,
    applicationRoute: 'mypage',
  });

  const allStatuses = [
    ...DEFAULT_STATUSES,
    ...customStatuses.map(s => ({ id: s.id, name: s.name, badge: 'badge-custom' }))
  ];

  const getStatusInfo = (statusId) => {
    return allStatuses.find(s => s.id === statusId) || { name: statusId, badge: 'badge-custom' };
  };

  const getDeadlineClass = (deadline) => {
    if (!deadline) return 'deadline-normal';
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'deadline-normal';
    if (diffDays <= 3) return 'deadline-urgent';
    if (diffDays <= 7) return 'deadline-soon';
    return 'deadline-normal';
  };

  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateDisplay = `${month}/${day}`;
    if (timeStr) {
      return `${dateDisplay} ${timeStr}`;
    }
    return dateDisplay;
  };

  const getRouteInfo = (routeId) => {
    return APPLICATION_ROUTES.find(r => r.id === routeId) || APPLICATION_ROUTES[3];
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    // 締切でソート
    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const handleAddCompany = () => {
    if (!newCompany.name.trim()) return;

    onAddCompany({
      id: Date.now().toString(),
      name: newCompany.name.trim(),
      status: newCompany.status,
      deadline: newCompany.deadline,
      deadlineTime: newCompany.deadlineTime,
      starred: newCompany.starred,
      applicationRoute: newCompany.applicationRoute,
      memo: '',
    });

    setNewCompany({ name: '', status: 'es', deadline: '', deadlineTime: '', starred: false, applicationRoute: 'mypage' });
    setShowAddModal(false);
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>JobTracker</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + 企業追加
        </button>
      </div>

      {companies.length === 0 ? (
        <div className="empty-state card">
          <p>まだ企業が登録されていません</p>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            最初の企業を追加
          </button>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>企業名</th>
                <th>経路</th>
                <th>ステータス</th>
                <th>締切 / 日程</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company) => {
                const statusInfo = getStatusInfo(company.status);
                const routeInfo = getRouteInfo(company.applicationRoute);
                return (
                  <tr key={company.id} onClick={() => onSelectCompany(company)}>
                    <td className={`company-name ${company.starred ? 'company-starred' : ''}`}>
                      {company.name}
                    </td>
                    <td>
                      <span className="route-badge" style={{ backgroundColor: routeInfo.color + '25', color: routeInfo.color }}>
                        {routeInfo.name}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusInfo.badge}`}>
                        {statusInfo.name}
                      </span>
                    </td>
                    <td className={getDeadlineClass(company.deadline)}>
                      {formatDateTime(company.deadline, company.deadlineTime)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>企業を追加</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>

            <div className="form-group">
              <label>企業名</label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                placeholder="例: トヨタ自動車"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>ステータス</label>
              <select
                value={newCompany.status}
                onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value })}
              >
                {allStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>締切 / 面接日</label>
              <div className="datetime-input-group">
                <input
                  type="date"
                  value={newCompany.deadline}
                  onChange={(e) => setNewCompany({ ...newCompany, deadline: e.target.value })}
                />
                <input
                  type="time"
                  value={newCompany.deadlineTime}
                  onChange={(e) => setNewCompany({ ...newCompany, deadlineTime: e.target.value })}
                  placeholder="時刻（任意）"
                />
              </div>
            </div>

            <div className="form-group">
              <label>応募経路</label>
              <select
                value={newCompany.applicationRoute}
                onChange={(e) => setNewCompany({ ...newCompany, applicationRoute: e.target.value })}
              >
                {APPLICATION_ROUTES.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCompany.starred}
                  onChange={(e) => setNewCompany({ ...newCompany, starred: e.target.checked })}
                />
                <span className="star-checkbox">★</span>
                注目企業としてマーク
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleAddCompany}>
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
