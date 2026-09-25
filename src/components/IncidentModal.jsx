import React from 'react';

export default function IncidentModal({ incident, onClose }) {
  if (!incident) return null;

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(incident, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `policyguard-forensics-${incident.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="pg-modal-backdrop" onClick={onClose}>
      <div className="pg-modal-dialog pg-forensic-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pg-modal-header">
          <div className="modal-title-row">
            <span className={`pg-severity-badge ${incident.severity.toLowerCase()}`}>
              {incident.severity}
            </span>
            <span className={`pg-action-badge ${incident.action.toLowerCase()}`}>
              {incident.action}
            </span>
            <span className="font-mono text-cyan modal-id">{incident.id}</span>
          </div>

          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="pg-modal-body forensic-body">
          {/* Metadata Grid */}
          <div className="forensic-meta-grid">
            <div className="meta-box">
              <span className="meta-lbl">Triggered Rule:</span>
              <span className="meta-val fw-600">{incident.ruleTriggered}</span>
            </div>
            <div className="meta-box">
              <span className="meta-lbl">Source Service:</span>
              <span className="meta-val">{incident.source}</span>
            </div>
            <div className="meta-box">
              <span className="meta-lbl">Origin Endpoint / IP:</span>
              <span className="meta-val font-mono">{incident.originIp}</span>
            </div>
            <div className="meta-box">
              <span className="meta-lbl">Verification Latency:</span>
              <span className="meta-val text-cyan font-mono">{incident.latency}</span>
            </div>
          </div>

          {/* Compliance & Threat Impact */}
          <div className="forensic-section">
            <span className="section-title">Regulatory Impact & Governance Justification:</span>
            <div className="impact-box">
              <svg viewBox="0 0 20 20" fill="currentColor" className="impact-icon">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <span>{incident.complianceImpact || 'Protected personal data under strict zero-trust boundary.'}</span>
            </div>
          </div>

          {/* Detected Entities List */}
          {incident.entitiesDetected && incident.entitiesDetected.length > 0 && (
            <div className="forensic-section">
              <span className="section-title">Detected Sensitive Signatures / Entities:</span>
              <div className="entities-pill-wrap">
                {incident.entitiesDetected.map((ent, idx) => (
                  <span key={idx} className="entity-tag">
                    {ent}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Intercepted Snippet Box */}
          <div className="forensic-section">
            <span className="section-title">Intercepted Payload Forensic Excerpt:</span>
            <div className="payload-inspect-box">
              <pre>{incident.snippet}</pre>
            </div>
          </div>

          {/* Safeguard Mitigation Summary */}
          <div className="forensic-section">
            <span className="section-title">PolicyGuard Enforcement Action Taken:</span>
            <p className="remediation-text">
              {incident.action === 'BLOCKED'
                ? 'The inbound payload was immediately halted at the edge gateway. No downstream vector embedding or LLM inference tokens were generated. Client returned HTTP 422 Policy Violation.'
                : incident.action === 'REDACTED'
                ? 'Sensitive PII tokens were replaced with zero-entropy synthetic placeholders in ephemeral memory before LLM context generation. Privacy preserved without disrupting user workflow.'
                : 'Telemetry event dispatched to organization compliance officer for human-in-the-loop review.'}
            </p>
          </div>
        </div>

        <div className="pg-modal-footer">
          <button className="pg-btn pg-btn-outline" onClick={handleDownloadJSON}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Download Forensics JSON</span>
          </button>
          <button className="pg-btn pg-btn-primary" onClick={onClose}>
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
