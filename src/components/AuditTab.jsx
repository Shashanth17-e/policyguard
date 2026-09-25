import React, { useState } from 'react';

export default function AuditTab({ auditLogs, onInspectIncident }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ruleTriggered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.originIp.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'ALL' || item.action === actionFilter;
    const matchesSeverity = severityFilter === 'ALL' || item.severity === severityFilter;

    return matchesSearch && matchesAction && matchesSeverity;
  });

  const handleExportCSV = () => {
    const headers = ['IncidentID', 'Timestamp', 'Source', 'OriginIP', 'RuleTriggered', 'Action', 'Severity', 'Latency'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.source}"`,
      `"${l.originIp}"`,
      `"${l.ruleTriggered}"`,
      l.action,
      l.severity,
      l.latency
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `policyguard-audit-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pg-tab-content pg-audit-tab">
      {/* Header card with filters and stats */}
      <div className="pg-card audit-header-card">
        <div className="audit-header-top">
          <div>
            <span className="pg-card-tag">Forensic Stream</span>
            <h2 className="pg-card-title">Real-Time Privacy & Safety Interception Stream</h2>
            <p className="audit-desc">
              Immutable cryptographically hashed audit records of all blocked adversarial attacks, masked PII disclosures, and compliance alerts.
            </p>
          </div>

          <div className="audit-header-actions">
            <span className="pg-live-pill">
              <span className="pulse-dot" /> Live Telemetry
            </span>
            <button
              className="pg-btn pg-btn-outline"
              onClick={handleExportCSV}
              id="btn-export-csv"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Export Audit CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="audit-filter-controls">
          <div className="search-box">
            <svg viewBox="0 0 20 20" fill="currentColor" className="search-icon">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search by ID, IP, service, rule or snippet..."
              className="pg-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-pill-set">
            <span className="filter-label">Action:</span>
            {['ALL', 'BLOCKED', 'REDACTED', 'FLAGGED', 'ROUTED'].map((act) => (
              <button
                key={act}
                className={`filter-chip ${actionFilter === act ? 'active' : ''}`}
                onClick={() => setActionFilter(act)}
              >
                {act}
              </button>
            ))}
          </div>

          <div className="filter-pill-set">
            <span className="filter-label">Severity:</span>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
              <button
                key={sev}
                className={`filter-chip ${severityFilter === sev ? 'active' : ''}`}
                onClick={() => setSeverityFilter(sev)}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="pg-card audit-table-card">
        <div className="table-responsive">
          <table className="pg-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Time</th>
                <th>Source Service</th>
                <th>Guardrail Rule</th>
                <th>Action</th>
                <th>Severity</th>
                <th>Intercepted Snippet</th>
                <th>Latency</th>
                <th>Forensics</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => onInspectIncident(log)}
                    className="clickable-row"
                  >
                    <td className="font-mono text-cyan fw-600">{log.id}</td>
                    <td className="text-muted text-sm">{log.timestamp}</td>
                    <td>
                      <div className="source-cell">
                        <span className="source-name">{log.source}</span>
                        <span className="source-ip font-mono">{log.originIp}</span>
                      </div>
                    </td>
                    <td>
                      <div className="rule-cell">
                        <span className="rule-title">{log.ruleTriggered}</span>
                        <span className="rule-category">{log.category}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`pg-action-badge ${log.action.toLowerCase()}`}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <span className={`pg-severity-badge ${log.severity.toLowerCase()}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="snippet-cell font-mono">
                      <span className="snippet-text" title={log.snippet}>
                        "{log.snippet}"
                      </span>
                    </td>
                    <td className="font-mono text-sm">{log.latency}</td>
                    <td>
                      <button
                        className="pg-btn pg-btn-xs pg-btn-ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectIncident(log);
                        }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="empty-table-cell">
                    No security interception records matched your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="audit-table-footer">
          <span>Showing {filteredLogs.length} of {auditLogs.length} total forensic records</span>
          <span className="compliance-stamp">Cryptographically Sealed SHA-256 Audit Trail</span>
        </div>
      </div>
    </div>
  );
}
