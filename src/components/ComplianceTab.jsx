import React, { useState } from 'react';
import { COMPLIANCE_FRAMEWORKS } from '../data/mockData';

export default function ComplianceTab({ onExportCertificate }) {
  const [selectedFramework, setSelectedFramework] = useState(COMPLIANCE_FRAMEWORKS[0]);

  const auditChecklist = [
    {
      id: 'chk-01',
      title: 'Automatic De-identification of Special Category Data',
      framework: 'GDPR (Art. 9) & HIPAA',
      status: 'VERIFIED',
      desc: 'All racial, health, biometric, and political beliefs in prompt inputs are scrubbed with cryptographic tokens.'
    },
    {
      id: 'chk-02',
      title: 'Adversarial Prompt Injection & Jailbreak Defense',
      framework: 'EU AI Act (Title II) & OWASP LLM01',
      status: 'VERIFIED',
      desc: 'Edge-filtering shields against role impersonation, system prompt leakage, and unauthorized function tool execution.'
    },
    {
      id: 'chk-03',
      title: 'Zero-Retention In-Memory Vector Sanitization',
      framework: 'HIPAA §164.514 & SOC 2 CC6.1',
      status: 'VERIFIED',
      desc: 'No raw unmasked PHI or financial identifiers are written to permanent database storage or cache logs.'
    },
    {
      id: 'chk-04',
      title: 'Cross-Border Transfer Sovereignty Boundaries',
      framework: 'GDPR Chapter V (Schrems II)',
      status: 'MONITORING',
      desc: 'EEA customer embeddings routed exclusively to approved regional data centers.'
    },
    {
      id: 'chk-05',
      title: 'Consumer Sensitive Personal Info (SPI) Opt-Out',
      framework: 'CCPA / CPRA §1798.121',
      status: 'VERIFIED',
      desc: 'User opt-out flags honored dynamically before sending contextual memory to external foundation models.'
    },
    {
      id: 'chk-06',
      title: 'Tamper-Resistant Cryptographic Audit Logging',
      framework: 'SOC 2 Type II CC6.8 & ISO 27001',
      status: 'VERIFIED',
      desc: 'All security drops and sanitizations produce immutable SHA-256 telemetry trails.'
    }
  ];

  return (
    <div className="pg-tab-content pg-compliance-tab">
      {/* Header Banner */}
      <div className="pg-card compliance-header-card">
        <div className="header-flex-row">
          <div>
            <span className="pg-card-tag">Governance & Regulatory Standards</span>
            <h2 className="pg-card-title">Global Privacy & AI Safety Compliance Radar</h2>
            <p className="compliance-desc">
              Continuous real-time verification of enterprise data protection mandates, healthcare privacy rules, and AI safety regulations.
            </p>
          </div>

          <button
            className="pg-btn pg-btn-primary"
            onClick={onExportCertificate}
            id="btn-download-cert"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            <span>Download Compliance Attestation</span>
          </button>
        </div>

        {/* Framework Score Cards */}
        <div className="compliance-cards-grid">
          {COMPLIANCE_FRAMEWORKS.map((fw) => (
            <div
              key={fw.id}
              className={`compliance-framework-card ${selectedFramework.id === fw.id ? 'active' : ''}`}
              onClick={() => setSelectedFramework(fw)}
              role="button"
              tabIndex={0}
            >
              <div className="fw-card-top">
                <span className="fw-region">{fw.region}</span>
                <span className={`fw-badge ${fw.badgeClass}`}>{fw.status}</span>
              </div>

              <h4 className="fw-name">{fw.name}</h4>

              <div className="fw-score-row">
                <span className="fw-score-number">{fw.score}%</span>
                <span className="fw-controls">
                  {fw.controlsPassed}/{fw.controlsTotal} controls
                </span>
              </div>

              <div className="fw-progress-track">
                <div
                  className="fw-progress-fill"
                  style={{ width: `${fw.score}%` }}
                />
              </div>

              <span className="fw-audit-time">Last audited: {fw.lastAudit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Checklist & Selected Framework Details */}
      <div className="pg-grid-2col compliance-detail-grid">
        {/* Active Framework Deep-Dive */}
        <div className="pg-card">
          <div className="pg-card-header">
            <div>
              <span className="pg-card-tag">Active Evaluation</span>
              <h3 className="pg-card-title">{selectedFramework.name}</h3>
            </div>
            <span className="pg-grade-pill">{selectedFramework.score}% Pass</span>
          </div>

          <div className="fw-deep-dive">
            <p className="fw-deep-desc">{selectedFramework.details}</p>

            <div className="fw-metrics-split">
              <div className="m-box">
                <span className="m-label">Controls Passing</span>
                <span className="m-val text-emerald">{selectedFramework.controlsPassed}</span>
              </div>
              <div className="m-box">
                <span className="m-label">Remaining Gap</span>
                <span className="m-val text-amber">{selectedFramework.controlsTotal - selectedFramework.controlsPassed}</span>
              </div>
              <div className="m-box">
                <span className="m-label">Audit Readiness</span>
                <span className="m-val text-cyan">Tier 1 Certified</span>
              </div>
            </div>

            <div className="attestation-box">
              <div className="shield-icon-circle">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.68.056-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="attestation-content">
                <span className="attest-title">Automated Technical Safeguard Guarantee</span>
                <p className="attest-desc">
                  PolicyGuard runs upstream before model inference. Sensitive records are tokenized in ephemeral RAM, fulfilling Article 25 (Privacy by Design) and HIPAA Safe Harbor De-identification requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Technical Controls Checklist */}
        <div className="pg-card">
          <div className="pg-card-header">
            <div>
              <span className="pg-card-tag">Automated Verifications</span>
              <h3 className="pg-card-title">Technical Controls Checklist</h3>
            </div>
            <span className="pg-badge-chip success">6 / 6 Guarded</span>
          </div>

          <div className="checklist-container">
            {auditChecklist.map((item) => (
              <div key={item.id} className="checklist-item">
                <div className="chk-status-col">
                  {item.status === 'VERIFIED' ? (
                    <span className="status-badge verified">✓ Verified</span>
                  ) : (
                    <span className="status-badge monitoring">⚡ Monitoring</span>
                  )}
                </div>
                <div className="chk-info-col">
                  <div className="chk-title-row">
                    <h5 className="chk-title">{item.title}</h5>
                    <span className="chk-framework">{item.framework}</span>
                  </div>
                  <p className="chk-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
