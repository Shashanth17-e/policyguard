import React, { useState } from 'react';
import { SCAN_PRESETS, analyzePayload } from '../data/mockData';

export default function ScannerTab({ onAddIncidentToAudit }) {
  const [inputText, setInputText] = useState(SCAN_PRESETS[0].text);
  const [selectedPresetId, setSelectedPresetId] = useState(SCAN_PRESETS[0].id);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(() => analyzePayload(SCAN_PRESETS[0].text));
  const [copied, setCopied] = useState(false);
  const [recordedToast, setRecordedToast] = useState(false);

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
    handleScan(preset.text);
  };

  const handleScan = (textToScan = inputText) => {
    setIsScanning(true);
    setTimeout(() => {
      const output = analyzePayload(textToScan);
      setResults(output);
      setIsScanning(false);
    }, 450);
  };

  const handleCopyRedacted = () => {
    if (!results || !results.redactedText) return;
    navigator.clipboard.writeText(results.redactedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRecordToAudit = () => {
    if (!results || results.entities.length === 0) return;
    const newIncident = {
      id: `INC-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: 'Just now',
      source: 'PolicyGuard Live Sandbox / Edge Tester',
      originIp: '127.0.0.1 (local-sandbox-session)',
      ruleTriggered: results.policiesTriggered[0] || 'Dynamic Guardrail Filter',
      category: results.entities[0]?.category || 'Data Privacy',
      action: results.verdict === 'BLOCKED' ? 'BLOCKED' : 'REDACTED',
      severity: results.riskScore > 80 ? 'CRITICAL' : results.riskScore > 50 ? 'HIGH' : 'MEDIUM',
      snippet: inputText.slice(0, 75) + '...',
      entitiesDetected: results.entities.map(e => e.label),
      complianceImpact: results.regulations.join(', ') || 'Privacy Baseline Enforced',
      latency: results.latency
    };

    onAddIncidentToAudit(newIncident);
    setRecordedToast(true);
    setTimeout(() => setRecordedToast(false), 2500);
  };

  return (
    <div className="pg-tab-content pg-scanner-tab">
      {/* Scanner Header & Preset Selectors */}
      <div className="pg-card scanner-header-card">
        <div className="scanner-title-row">
          <div>
            <span className="pg-card-tag">Real-Time Evaluation</span>
            <h2 className="pg-card-title">Live Policy & Privacy Guardrail Sandbox</h2>
          </div>
          <div className="scanner-badge-group">
            <span className="pg-badge-chip">Edge Regex + Semantic Filter</span>
            <span className="pg-badge-chip success">Zero Persistence</span>
          </div>
        </div>

        <p className="scanner-desc">
          Evaluate input prompts, customer payloads, or AI completions for PII leaks, credit card numbers, prompt injections, and HIPAA violations in real time.
        </p>

        <div className="preset-selector-bar">
          <span className="preset-label">Quick Test Presets:</span>
          <div className="preset-buttons">
            {SCAN_PRESETS.map((preset) => (
              <button
                key={preset.id}
                className={`preset-btn ${selectedPresetId === preset.id ? 'active' : ''}`}
                onClick={() => handleSelectPreset(preset)}
              >
                <span>{preset.title}</span>
                <span className="preset-category-tag">{preset.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Input Pane on Left, Analysis Verdict on Right */}
      <div className="pg-grid-2col scanner-workspace-grid">
        {/* Left Column: Input Textarea & Controls */}
        <div className="pg-card input-card">
          <div className="pg-card-header">
            <div className="editor-tab-title">
              <svg viewBox="0 0 20 20" fill="currentColor" className="card-icon">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Payload Inspector (Text / JSON / Prompt)</span>
            </div>
            <span className="char-counter">
              {inputText.length} characters | {inputText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <div className="textarea-wrapper">
            <textarea
              className="scanner-textarea"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedPresetId(null);
              }}
              placeholder="Paste raw text, customer prompt, API JSON, or medical narrative to evaluate against PolicyGuard..."
              rows={9}
              id="scanner-input"
            />
          </div>

          <div className="input-card-footer">
            <button
              className="pg-btn pg-btn-ghost"
              onClick={() => {
                setInputText('');
                setSelectedPresetId(null);
                setResults(null);
              }}
            >
              Clear
            </button>

            <button
              className={`pg-btn pg-btn-primary ${isScanning ? 'loading' : ''}`}
              onClick={() => handleScan(inputText)}
              disabled={isScanning || !inputText.trim()}
              id="btn-run-analysis"
            >
              {isScanning ? (
                <>
                  <span className="spinner" />
                  <span>Evaluating Guardrails...</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Evaluate Payload</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Real-Time Results & Sanitized Output */}
        <div className="pg-card results-card">
          <div className="pg-card-header">
            <div>
              <span className="pg-card-tag">Evaluation Output</span>
              <h3 className="pg-card-title">Sanitization & Policy Verdict</h3>
            </div>
            {results && (
              <span className="latency-pill">Latency: {results.latency}</span>
            )}
          </div>

          {results ? (
            <div className="results-body">
              {/* Verdict Banner */}
              <div className={`verdict-banner ${results.verdict.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="verdict-icon-box">
                  {results.verdict === 'BLOCKED' && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.366zm1.414-1.414L6.525 5.11a6 6 0 018.366 8.366zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {results.verdict.includes('RISK') && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {results.verdict === 'SAFE' && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="verdict-text-box">
                  <span className="verdict-label">GUARDRAIL VERDICT:</span>
                  <h4 className="verdict-title">{results.verdict}</h4>
                  <span className="risk-score-tag">
                    Threat Index: <strong>{results.riskScore}/100</strong>
                  </span>
                </div>
              </div>

              {/* Detected Entities Chips */}
              <div className="entities-section">
                <span className="section-label">
                  Detected Sensitive Entities & Vulnerabilities ({results.entities.length}):
                </span>
                {results.entities.length > 0 ? (
                  <div className="entities-list">
                    {results.entities.map((ent, idx) => (
                      <div key={idx} className={`entity-chip-card ${ent.severity.toLowerCase()}`}>
                        <div className="chip-header">
                          <span className="chip-type">{ent.type}</span>
                          <span className="chip-conf">{ent.confidence}% conf</span>
                        </div>
                        <div className="chip-name">{ent.label}</div>
                        <div className="chip-val font-mono">{ent.value}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-entities-box">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="check-icon">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Clean payload. No PII, secrets, or adversarial injections found.</span>
                  </div>
                )}
              </div>

              {/* Sanitized & Redacted Output Box */}
              <div className="redacted-output-section">
                <div className="redacted-header-row">
                  <span className="section-label">Safe Sanitized Payload (Edge Redacted):</span>
                  <button
                    className="pg-btn pg-btn-xs pg-btn-outline"
                    onClick={handleCopyRedacted}
                    title="Copy Sanitized Text"
                  >
                    {copied ? (
                      <span>✓ Copied</span>
                    ) : (
                      <>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon-xs">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        <span>Copy Redacted</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="redacted-text-box">
                  <pre>{results.redactedText}</pre>
                </div>
              </div>

              {/* Regulatory impact footer */}
              {results.regulations.length > 0 && (
                <div className="regulations-enforced-row">
                  <span className="reg-title">Compliance Mandates Enforced:</span>
                  <div className="reg-chips">
                    {results.regulations.map((reg, idx) => (
                      <span key={idx} className="reg-badge">
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Simulation Logging Action */}
              <div className="results-action-row">
                <button
                  className="pg-btn pg-btn-secondary"
                  onClick={handleRecordToAudit}
                  disabled={results.entities.length === 0}
                  title="Push this test incident into the real-time Audit Stream"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Log to Audit Stream</span>
                </button>
                {recordedToast && (
                  <span className="recorded-toast">✓ Appended to Live Audit Log!</span>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-results-box">
              <p>Click "Evaluate Payload" to run PolicyGuard safety checks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
