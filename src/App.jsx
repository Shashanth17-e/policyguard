import React, { useState } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import OverviewTab from './components/OverviewTab';
import ScannerTab from './components/ScannerTab';
import PoliciesTab from './components/PoliciesTab';
import AuditTab from './components/AuditTab';
import ComplianceTab from './components/ComplianceTab';
import IncidentModal from './components/IncidentModal';
import { INITIAL_POLICIES, INITIAL_AUDIT_LOGS } from './data/mockData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [shieldActive, setShieldActive] = useState(true);
  const [selectedEnv, setSelectedEnv] = useState('prod-gateway');
  const [policies, setPolicies] = useState(INITIAL_POLICIES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [inspectedIncident, setInspectedIncident] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic metrics based on policies and logs
  const activePoliciesCount = policies.filter((p) => p.status === 'ACTIVE').length;
  const metrics = {
    safetyScore: shieldActive ? Math.min(99, 90 + Math.round((activePoliciesCount / policies.length) * 8)) : 34,
    piiCount: 1842 + auditLogs.filter(l => l.category === 'Data Privacy' || l.action === 'REDACTED').length * 12,
    jailbreakCount: 318 + auditLogs.filter(l => l.action === 'BLOCKED').length,
    complianceScore: shieldActive ? 96.2 : 42.0
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleTogglePolicy = (policyId) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === policyId) {
          const nextStatus = p.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          showToast(`Policy "${p.name}" set to ${nextStatus}`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleUpdatePolicyMode = (policyId, newMode) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === policyId) {
          showToast(`Sensitivity for "${p.name}" updated to ${newMode}`);
          return { ...p, mode: newMode };
        }
        return p;
      })
    );
  };

  const handleAddPolicy = (newRule) => {
    setPolicies((prev) => [newRule, ...prev]);
    showToast(`New Guardrail Rule "${newRule.name}" deployed to gateway`);
  };

  const handleAddIncidentToAudit = (newIncident) => {
    setAuditLogs((prev) => [newIncident, ...prev]);
    showToast(`Logged security incident ${newIncident.id} to audit trail`);
  };

  const handleExportReport = () => {
    const reportData = {
      project: 'PolicyGuard Privacy & Safety Guardrails',
      timestamp: new Date().toISOString(),
      environment: selectedEnv,
      shieldActive,
      healthIndex: metrics.safetyScore,
      activeGuardrails: activePoliciesCount,
      totalPolicies: policies.length,
      complianceScore: `${metrics.complianceScore}%`,
      recentAuditCount: auditLogs.length
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `policyguard-enterprise-audit-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Executive Compliance Report exported as JSON');
  };

  const handleExportCertificate = () => {
    showToast('Compliance Attestation Certificate generated and verified against 140 enterprise controls.');
  };

  return (
    <div className="pg-root">
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="pg-toast" role="alert">
          <div className="toast-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shieldActive={shieldActive}
        setShieldActive={(val) => {
          setShieldActive(val);
          showToast(val ? 'Guardrail Shield Activated: In-line filtering live' : 'WARNING: Guardrail Shield Bypassed!');
        }}
        selectedEnv={selectedEnv}
        setSelectedEnv={(env) => {
          setSelectedEnv(env);
          showToast(`Switched active gateway to: ${env}`);
        }}
        onQuickScan={() => setActiveTab('scanner')}
        onExportReport={handleExportReport}
      />

      {/* Main Container */}
      <main className="pg-main-container">
        {/* Warning banner if shield is deactivated */}
        {!shieldActive && (
          <div className="pg-bypass-warning-banner" role="alert">
            <svg viewBox="0 0 20 20" fill="currentColor" className="warning-icon">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="warning-content">
              <strong>GUARDRAIL SHIELD BYPASSED:</strong> In-line PII redaction and adversarial prompt injection filtering are currently paused. Production inference is running unshielded.
            </div>
            <button
              className="pg-btn pg-btn-primary pg-btn-xs"
              onClick={() => {
                setShieldActive(true);
                showToast('Guardrail Shield Re-enabled');
              }}
            >
              Re-Enable Shield Now
            </button>
          </div>
        )}

        {/* Executive KPI Cards */}
        <MetricCards metrics={metrics} />

        {/* Tab Content Panels */}
        {activeTab === 'overview' && (
          <OverviewTab
            auditLogs={auditLogs}
            policies={policies}
            onInspectIncident={(item) => setInspectedIncident(item)}
            onNavigateToScanner={() => setActiveTab('scanner')}
          />
        )}

        {activeTab === 'scanner' && (
          <ScannerTab
            onAddIncidentToAudit={handleAddIncidentToAudit}
          />
        )}

        {activeTab === 'policies' && (
          <PoliciesTab
            policies={policies}
            onTogglePolicy={handleTogglePolicy}
            onUpdatePolicyMode={handleUpdatePolicyMode}
            onAddPolicy={handleAddPolicy}
          />
        )}

        {activeTab === 'audit' && (
          <AuditTab
            auditLogs={auditLogs}
            onInspectIncident={(item) => setInspectedIncident(item)}
          />
        )}

        {activeTab === 'compliance' && (
          <ComplianceTab
            onExportCertificate={handleExportCertificate}
          />
        )}
      </main>

      {/* Forensic Incident Inspection Modal */}
      {inspectedIncident && (
        <IncidentModal
          incident={inspectedIncident}
          onClose={() => setInspectedIncident(null)}
        />
      )}

      {/* Footer */}
      <footer className="pg-footer">
        <div className="footer-left">
          <span className="footer-brand">PolicyGuard Intelligence Engine</span>
          <span className="footer-divider">•</span>
          <span className="footer-status">Edge Guardrails v2.4</span>
          <span className="footer-divider">•</span>
          <span className="footer-status text-emerald">Zero-Retention In-Memory Verification</span>
        </div>
        <div className="footer-right">
          <span>GDPR Art. 25 • HIPAA §164.514 • EU AI Act • PCI-DSS 4.0 Compliant</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
