import React from 'react';

export default function Header({
  activeTab,
  setActiveTab,
  shieldActive,
  setShieldActive,
  selectedEnv,
  setSelectedEnv,
  onQuickScan,
  onExportReport
}) {
  return (
    <header className="pg-header">
      <div className="pg-header-left">
        <div className="pg-brand">
          <div className="pg-logo-wrapper">
            <svg
              className="pg-logo-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M16 3L5 7.5V15.5C5 22.8 9.7 29.5 16 31C22.3 29.5 27 22.8 27 15.5V7.5L16 3Z"
                fill="url(#shieldGrad)"
                opacity="0.2"
              />
              <path
                d="M16 3L5 7.5V15.5C5 22.8 9.7 29.5 16 31C22.3 29.5 27 22.8 27 15.5V7.5L16 3Z"
                stroke="url(#shieldGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <path
                d="M11 16L14.5 19.5L21.5 12.5"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className={`pg-status-ping ${shieldActive ? 'active' : 'inactive'}`} />
          </div>
          <div className="pg-brand-text">
            <div className="pg-brand-title-row">
              <span className="pg-brand-name">PolicyGuard</span>
              <span className="pg-version-tag">v2.4 Enterprise</span>
            </div>
            <span className="pg-brand-subtitle">AI & Privacy Safety Guardrails</span>
          </div>
        </div>

        <nav className="pg-nav-pills" aria-label="Main Navigation">
          <button
            className={`pg-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            id="tab-overview"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="nav-icon">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span>Overview</span>
          </button>

          <button
            className={`pg-nav-btn ${activeTab === 'scanner' ? 'active' : ''}`}
            onClick={() => setActiveTab('scanner')}
            id="tab-scanner"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="nav-icon">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
              <path d="M11 12a1 1 0 011-1h1v1h-1v1h1v1h-2v-2zm3 0h1v1h-1v-1zm0 2h1v1h-1v-1zm-2 2h2v1h-2v-1z" />
            </svg>
            <span>Live Scanner</span>
            <span className="pg-badge-chip">Live</span>
          </button>

          <button
            className={`pg-nav-btn ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
            id="tab-policies"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="nav-icon">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
            <span>Guardrail Rules</span>
          </button>

          <button
            className={`pg-nav-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
            id="tab-audit"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="nav-icon">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>Audit Stream</span>
          </button>

          <button
            className={`pg-nav-btn ${activeTab === 'compliance' ? 'active' : ''}`}
            onClick={() => setActiveTab('compliance')}
            id="tab-compliance"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="nav-icon">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Compliance Radar</span>
          </button>
        </nav>
      </div>

      <div className="pg-header-right">
        <div className="pg-env-selector-wrapper">
          <label htmlFor="env-select" className="pg-sr-only">Environment</label>
          <select
            id="env-select"
            value={selectedEnv}
            onChange={(e) => setSelectedEnv(e.target.value)}
            className="pg-env-select"
          >
            <option value="prod-gateway">Prod LLM Gateway</option>
            <option value="staging-rag">Staging RAG Pipeline</option>
            <option value="support-agent">Customer Copilot</option>
            <option value="internal-vpc">Internal VPC Airgap</option>
          </select>
        </div>

        <div className="pg-shield-toggle-wrapper">
          <span className="pg-toggle-label">
            {shieldActive ? 'Shield Active' : 'Shield Bypassed'}
          </span>
          <button
            type="button"
            className={`pg-toggle-switch ${shieldActive ? 'active' : ''}`}
            onClick={() => setShieldActive(!shieldActive)}
            title={shieldActive ? "Disable Guardrail Shield" : "Enable Guardrail Shield"}
            id="shield-toggle-btn"
          >
            <span className="pg-toggle-thumb" />
          </button>
        </div>

        <button
          className="pg-btn pg-btn-primary"
          onClick={onQuickScan}
          id="btn-quick-scan"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Run Scan</span>
        </button>

        <button
          className="pg-btn pg-btn-outline"
          onClick={onExportReport}
          title="Export Compliance Audit Report"
          id="btn-export-report"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="hide-sm">Export</span>
        </button>
      </div>
    </header>
  );
}
