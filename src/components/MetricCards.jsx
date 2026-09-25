import React from 'react';

export default function MetricCards({ metrics }) {
  return (
    <section className="pg-metrics-grid" aria-label="Executive Privacy Metrics">
      {/* Card 1: Safety Health Index */}
      <div className="pg-card pg-metric-card">
        <div className="pg-card-header">
          <div>
            <span className="pg-metric-subtitle">Enterprise Posture</span>
            <h3 className="pg-metric-title">Privacy Safety Index</h3>
          </div>
          <span className="pg-grade-pill">Grade A+</span>
        </div>

        <div className="pg-metric-body-row">
          <div className="pg-metric-value-wrap">
            <span className="pg-metric-big-number">{metrics.safetyScore}</span>
            <span className="pg-metric-scale">/100</span>
            <div className="pg-metric-trend positive">
              <svg viewBox="0 0 20 20" fill="currentColor" className="trend-icon">
                <path fillRule="evenodd" d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 9.586V7z" clipRule="evenodd" />
              </svg>
              <span>+2.4% this week</span>
            </div>
          </div>

          <div className="pg-radial-ring-wrapper">
            <svg className="pg-radial-svg" viewBox="0 0 44 44">
              <circle
                className="pg-radial-bg"
                cx="22"
                cy="22"
                r="18"
                strokeWidth="4"
              />
              <circle
                className="pg-radial-fill"
                cx="22"
                cy="22"
                r="18"
                strokeWidth="4"
                strokeDasharray="113.1"
                strokeDashoffset={113.1 - (113.1 * metrics.safetyScore) / 100}
                transform="rotate(-90 22 22)"
              />
              <text x="22" y="24" textAnchor="middle" className="pg-radial-text">97%</text>
            </svg>
          </div>
        </div>

        <div className="pg-card-footer-info">
          <span className="pg-dot-active" />
          <span>Zero unmasked PII disclosures recorded across all active gateways.</span>
        </div>
      </div>

      {/* Card 2: PII Redactions */}
      <div className="pg-card pg-metric-card">
        <div className="pg-card-header">
          <div>
            <span className="pg-metric-subtitle">Data Sanitization</span>
            <h3 className="pg-metric-title">PII Leaks Intercepted</h3>
          </div>
          <div className="pg-icon-badge emerald">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.68.056-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="pg-metric-body-row">
          <div className="pg-metric-value-wrap">
            <span className="pg-metric-big-number">{metrics.piiCount.toLocaleString()}</span>
            <span className="pg-metric-unit">tokens masked</span>
            <div className="pg-metric-trend positive">
              <svg viewBox="0 0 20 20" fill="currentColor" className="trend-icon">
                <path fillRule="evenodd" d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 9.586V7z" clipRule="evenodd" />
              </svg>
              <span>+18.7% protected payload volume</span>
            </div>
          </div>
        </div>

        <div className="pg-breakdown-chips">
          <span className="chip">429 Cards</span>
          <span className="chip">214 SSNs</span>
          <span className="chip">156 Health PHI</span>
          <span className="chip">1,043 Emails</span>
        </div>
      </div>

      {/* Card 3: Injections & Attacks */}
      <div className="pg-card pg-metric-card">
        <div className="pg-card-header">
          <div>
            <span className="pg-metric-subtitle">Threat Neutralization</span>
            <h3 className="pg-metric-title">Prompt Injections Blocked</h3>
          </div>
          <div className="pg-icon-badge amber">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.316.492-.63 1.135-.945 1.838-.636 1.418-1.258 3.167-1.848 4.757a2.5 2.5 0 00-.73 1.857c0 1.38.895 2.5 2 2.5h.5c.276 0 .5.224.5.5s-.224.5-.5.5h-.5c-1.933 0-3.5-1.567-3.5-3.5 0-.74.23-1.428.625-1.996C6.72 7.89 7.42 6.07 8.08 4.6 8.42 3.84 8.76 3.14 9.1 2.6c.39-.62.88-1.2 1.55-1.57a3 3 0 014.35 1.15c.67 1.15.5 2.57-.3 3.65l-.3.4a.5.5 0 00.7.7l.3-.4c1.17-1.58 1.4-3.66.42-5.32a4.99 4.99 0 00-3.42-2.61z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="pg-metric-body-row">
          <div className="pg-metric-value-wrap">
            <span className="pg-metric-big-number">{metrics.jailbreakCount}</span>
            <span className="pg-metric-unit">adversarial drops</span>
            <div className="pg-metric-trend neutral">
              <svg viewBox="0 0 20 20" fill="currentColor" className="trend-icon">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>100% capture rate on OWASP LLM01</span>
            </div>
          </div>
        </div>

        <div className="pg-card-footer-info">
          <span className="pg-dot-shield" />
          <span>DAN jailbreaks, role hijacking, & exfiltration directives dropped at edge.</span>
        </div>
      </div>

      {/* Card 4: Compliance Index */}
      <div className="pg-card pg-metric-card">
        <div className="pg-card-header">
          <div>
            <span className="pg-metric-subtitle">Audit Readiness</span>
            <h3 className="pg-metric-title">Compliance Index</h3>
          </div>
          <div className="pg-icon-badge cyan">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="pg-metric-body-row">
          <div className="pg-metric-value-wrap">
            <span className="pg-metric-big-number">{metrics.complianceScore}%</span>
            <span className="pg-metric-unit">controls passed</span>
            <div className="pg-metric-trend positive">
              <svg viewBox="0 0 20 20" fill="currentColor" className="trend-icon">
                <path fillRule="evenodd" d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 9.586V7z" clipRule="evenodd" />
              </svg>
              <span>134 / 140 enterprise criteria</span>
            </div>
          </div>
        </div>

        <div className="pg-compliance-mini-bars">
          <div className="mini-bar-item">
            <span className="label">GDPR</span>
            <span className="val">98%</span>
          </div>
          <div className="mini-bar-item">
            <span className="label">HIPAA</span>
            <span className="val">95%</span>
          </div>
          <div className="mini-bar-item">
            <span className="label">EU AI Act</span>
            <span className="val">92%</span>
          </div>
          <div className="mini-bar-item">
            <span className="label">CCPA</span>
            <span className="val">97%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
