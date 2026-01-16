import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Home from './components/Home';
import CompanyDetail from './components/CompanyDetail';
import Notes from './components/Notes';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [companies, setCompanies] = useLocalStorage('jobtracker_companies', []);
  const [customStatuses, setCustomStatuses] = useLocalStorage('jobtracker_statuses', []);
  const [notes, setNotes] = useLocalStorage('jobtracker_notes', Notes.defaultNotes);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setCurrentPage('detail');
  };

  const handleAddCompany = (company) => {
    setCompanies([...companies, company]);
  };

  const handleUpdateCompany = (updatedCompany) => {
    setCompanies(companies.map(c =>
      c.id === updatedCompany.id ? updatedCompany : c
    ));
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies(companies.filter(c => c.id !== companyId));
  };

  const handleAddCustomStatus = (status) => {
    setCustomStatuses([...customStatuses, status]);
  };

  const handleBack = () => {
    setSelectedCompany(null);
    setCurrentPage('home');
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">JobTracker</div>
        <div className="nav-items">
          <span
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('home'); setSelectedCompany(null); }}
          >
            ホーム
          </span>
          <span
            className={`nav-item ${currentPage === 'notes' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('notes'); setSelectedCompany(null); }}
          >
            メモ帳
          </span>
        </div>
      </nav>

      <main className="main">
        {currentPage === 'home' && (
          <Home
            companies={companies}
            onSelectCompany={handleSelectCompany}
            onAddCompany={handleAddCompany}
            customStatuses={customStatuses}
          />
        )}

        {currentPage === 'detail' && selectedCompany && (
          <CompanyDetail
            company={selectedCompany}
            onBack={handleBack}
            onUpdate={handleUpdateCompany}
            onDelete={handleDeleteCompany}
            customStatuses={customStatuses}
            onAddCustomStatus={handleAddCustomStatus}
          />
        )}

        {currentPage === 'notes' && (
          <Notes
            notes={notes}
            onUpdateNotes={setNotes}
          />
        )}
      </main>
    </div>
  );
}

export default App;
