import React from 'react';
import { HOURLY_CHART_DATA } from '../data/mockData';

export default function OverviewTab({
  auditLogs,
  policies,
  onInspectIncident,
  onNavigateToScanner
}) {
  const maxVolume = Math.max(...HOURLY_CHART_DATA.map(d => d.passed));

  return (
    <div className="pg-tab-content pg-overview-tab">
      {/* Top Split: 24h Traffic Bar Chart + Protection Telemetry */}
      <div className="pg-grid-2col">
        {/* 24h Activity Chart Card */}
        <div className="pg-card">
          <div className="pg-card-header">
            <div>
              <span className="pg-card-tag">Real-Time Telemetry</span>
              <h2 className="pg-card-title">24-Hour Guardrail Interception Activity</h2>
            </div>
            <div className="pg-chart-legend">
              <span className="legend-item"><span className="legend-dot green" /> Passed Safe</span>
              <span className="legend-item"><span className="legend-dot red" /> Intercepted</span>
            </div>
          </div>

          <div className="pg-chart-container">
            <div className="pg-chart-bars">
              {HOURLY_CHART_DATA.map((item, idx) => {
                const passedHeight = Math.round((item.passed / maxVolume) * 140);
                const interceptedHeight = Math.max(8, Math.round((item.intercepted / 250) * 80));

                return (
                  <div key={idx} className="pg-bar-group" title={`${item.time}: ${item.intercepted} intercepted / ${item.passed} passed`}>
                    <div className="pg-bar-stack">
                      <div
                        className="pg-bar-segment green"
                        style={{ height: `${passedHeight}px` }}
                      />
                      <div
                        className="pg-bar-segment red"
                        style={{ height: `${interceptedHeight}px` }}
                      />
                    </div>
                    <span className="pg-bar-label">{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pg-chart-summary">
            <div className="summary-stat">
              <span className="stat-label">Total Verified Payloads</span>
              <span className="stat-num">26,380</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Total Threat Drops</span>
              <span className="stat-num text-danger">986</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Average Edge Latency</span>
              <span className="stat-num text-cyan">1.18 ms</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Protection Uptime</span>
              <span className="stat-num text-emerald">99.998%</span>
            </div>
          </div>
        </div>

        {/* Threat Distribution & Guardrail Health */}
        <div className="pg-card">
          <div className="pg-card-header">
            <div>
              <span className="pg-card-tag">Rule Engine Coverage</span>
              <h2 className="pg-card-title">Guardrail Threat Category Split</h2>
            </div>
            <span className="pg-badge-chip">{policies ? `${policies.length} Configured Rules` : '8 Active Rules'}</span>
          </div>

          <div className="pg-distribution-bar-wrapper">
            <div className="pg-distribution-stacked-bar">
              <div className="dist-seg seg-pii" style={{ width: '46%' }} title="PII Scrubbing: 46%" />
              <div className="dist-seg seg-fin" style={{ width: '23%' }} title="PCI-DSS Cards: 23%" />
              <div className="dist-seg seg-ai" style={{ width: '17%' }} title="Prompt Injections: 17%" />
              <div className="dist-seg seg-med" style={{ width: '8%' }} title="Healthcare PHI: 8%" />
              <div className="dist-seg seg-sec" style={{ width: '6%' }} title="API Secrets: 6%" />
            </div>

            <div className="pg-dist-legend-grid">
              <div className="dist-legend-item">
                <span className="dot dot-pii" />
                <div className="legend-text">
                  <span className="name">PII Sanitization</span>
                  <span className="count">46% (842 leaks)</span>
                </div>
              </div>

              <div className="dist-legend-item">
                <span className="dot dot-fin" />
                <div className="legend-text">
                  <span className="name">PCI Financial Cards</span>
                  <span className="count">23% (429 leaks)</span>
                </div>
              </div>

              <div className="dist-legend-item">
                <span className="dot dot-ai" />
                <div className="legend-text">
                  <span className="name">Prompt Jailbreaks</span>
                  <span className="count">17% (318 drops)</span>
                </div>
              </div>

              <div className="dist-legend-item">
                <span className="dot dot-med" />
                <div className="legend-text">
                  <span className="name">Healthcare PHI</span>
                  <span className="count">8% (156 leaks)</span>
                </div>
              </div>

              <div className="dist-legend-item">
                <span className="dot dot-sec" />
                <div className="legend-text">
                  <span className="name">Secrets & Keys</span>
                  <span className="count">6% (73 leaks)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pg-telemetry-banner">
            <div className="telemetry-icon-box">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="telemetry-info">
              <span className="banner-title">Zero-Copy In-Memory Vector Inspection</span>
              <p className="banner-desc">
                PolicyGuard filters token payloads directly on the streaming edge, maintaining &lt;2ms SLA without saving raw personal data to persistent disks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent High-Risk Interceptions & Quick Scanner Prompt */}
      <div className="pg-grid-2col bottom-row">
        {/* Recent Security Incidents List */}
        <div className="pg-card">
          <div className="pg-card-header">
            <div>
              <span className="pg-card-tag">Live Feed</span>
              <h2 className="pg-card-title">Recent High-Priority Interceptions</h2>
            </div>
            <span className="pg-live-pill">
              <span className="pulse-dot" /> Streaming
            </span>
          </div>

          <div className="pg-incidents-list">
            {auditLogs.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="pg-incident-row"
                onClick={() => onInspectIncident(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onInspectIncident(item)}
              >
                <div className="incident-status-cell">
                  <span className={`pg-severity-badge ${item.severity.toLowerCase()}`}>
                    {item.severity}
                  </span>
                  <span className={`pg-action-badge ${item.action.toLowerCase()}`}>
                    {item.action}
                  </span>
                </div>

                <div className="incident-meta-cell">
                  <div className="meta-top">
                    <span className="incident-id">{item.id}</span>
                    <span className="incident-time">{item.timestamp}</span>
                    <span className="incident-source">{item.source}</span>
                  </div>
                  <div className="incident-rule-name">
                    {item.ruleTriggered}
                  </div>
                  <div className="incident-snippet">
                    "{item.snippet}"
                  </div>
                </div>

                <div className="incident-action-cell">
                  <button
                    className="pg-btn pg-btn-ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectIncident(item);
                    }}
                    title="Inspect Incident Forensics"
                  >
                    <span>Inspect</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon-sm">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Scanner Sandbox Callout */}
        <div className="pg-card pg-scanner-callout-card">
          <div className="callout-inner">
            <div className="callout-badge">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Interactive Guardrail Simulator</span>
            </div>

            <h3 className="callout-title">
              Test Any Prompt or Payload Against PolicyGuard
            </h3>
            <p className="callout-desc">
              Experience zero-latency sanitization in real-time. Test adversarial jailbreaks, PII exfiltration, healthcare PHI disclosures, or credential exposure with immediate regex & NLP verification.
            </p>

            <div className="callout-stats-row">
              <div className="c-stat">
                <span className="c-val">0 ms</span>
                <span className="c-sub">Storage Persistence</span>
              </div>
              <div className="c-stat">
                <span className="c-val">100%</span>
                <span className="c-sub">Client-side Safe Test</span>
              </div>
              <div className="c-stat">
                <span className="c-val">5+</span>
                <span className="c-sub">Global Privacy Laws</span>
              </div>
            </div>

            <button
              className="pg-btn pg-btn-primary pg-btn-lg"
              onClick={onNavigateToScanner}
              id="btn-goto-scanner"
            >
              <span>Launch Live Guardrail Sandbox</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
