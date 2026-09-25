import React, { useState } from 'react';

export default function PoliciesTab({ policies, onTogglePolicy, onUpdatePolicyMode, onAddPolicy }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    category: 'Data Privacy',
    description: '',
    mode: 'STRICT',
    regulations: ''
  });

  const categories = ['ALL', 'Data Privacy', 'AI Safety', 'Financial Safety', 'Healthcare PHI', 'Secrets & Auth', 'Compliance'];

  const filteredPolicies = policies.filter((pol) => {
    const matchesCategory = selectedCategory === 'ALL' || pol.category === selectedCategory;
    const matchesQuery =
      pol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pol.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pol.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const activeCount = policies.filter((p) => p.status === 'ACTIVE').length;
  const monitorCount = policies.filter((p) => p.status === 'MONITORING').length;
  const pausedCount = policies.filter((p) => p.status === 'PAUSED').length;

  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRule.name.trim()) return;

    const created = {
      id: `pol-custom-${Date.now()}`,
      name: newRule.name,
      code: `PG-USR-0${policies.length + 1}`,
      description: newRule.description || 'Custom organizational guardrail created by safety administrator.',
      category: newRule.category,
      status: 'ACTIVE',
      mode: newRule.mode,
      interceptions24h: 0,
      regulations: newRule.regulations.split(',').map(r => r.trim()).filter(Boolean),
      latencyImpact: '< 1.0ms'
    };

    onAddPolicy(created);
    setShowAddModal(false);
    setNewRule({
      name: '',
      category: 'Data Privacy',
      description: '',
      mode: 'STRICT',
      regulations: ''
    });
  };

  return (
    <div className="pg-tab-content pg-policies-tab">
      {/* Policy Control Banner */}
      <div className="pg-card policies-header-card">
        <div className="header-flex-row">
          <div>
            <span className="pg-card-tag">Enforcement Matrix</span>
            <h2 className="pg-card-title">Configured Privacy & AI Guardrail Rules</h2>
            <p className="policies-desc">
              Manage zero-trust inspection guardrails applied to inbound user queries, retrieval augmented generation (RAG) contexts, and LLM completions.
            </p>
          </div>

          <button
            className="pg-btn pg-btn-primary"
            onClick={() => setShowAddModal(true)}
            id="btn-add-guardrail"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Create Custom Rule</span>
          </button>
        </div>

        {/* Status Metrics Strip */}
        <div className="rule-status-strip">
          <div className="status-item">
            <span className="dot dot-active" />
            <span className="label">Active Enforcement:</span>
            <span className="val">{activeCount} Rules</span>
          </div>
          <div className="status-item">
            <span className="dot dot-monitor" />
            <span className="label">Monitoring (Passive):</span>
            <span className="val">{monitorCount} Rules</span>
          </div>
          <div className="status-item">
            <span className="dot dot-paused" />
            <span className="label">Disabled / Paused:</span>
            <span className="val">{pausedCount} Rules</span>
          </div>
          <div className="status-item ml-auto">
            <span className="label">Average Rule Pipeline Latency:</span>
            <span className="val text-cyan">1.14 ms</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="policies-filter-bar">
          <div className="category-pill-group">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <svg viewBox="0 0 20 20" fill="currentColor" className="search-icon">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              className="pg-input"
              placeholder="Filter rules by name or code (e.g. PG-AI-02)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="policies-cards-grid">
        {filteredPolicies.map((pol) => {
          const isActive = pol.status === 'ACTIVE';

          return (
            <div
              key={pol.id}
              className={`pg-card policy-card ${isActive ? 'card-active' : 'card-paused'}`}
            >
              <div className="policy-card-top">
                <div className="policy-code-badge">
                  <span className="code">{pol.code}</span>
                  <span className="category">{pol.category}</span>
                </div>

                <div className="policy-toggle-wrapper">
                  <span className={`status-label ${pol.status.toLowerCase()}`}>
                    {pol.status}
                  </span>
                  <button
                    type="button"
                    className={`pg-toggle-switch ${isActive ? 'active' : ''}`}
                    onClick={() => onTogglePolicy(pol.id)}
                    title={`Toggle ${pol.name}`}
                  >
                    <span className="pg-toggle-thumb" />
                  </button>
                </div>
              </div>

              <h3 className="policy-name">{pol.name}</h3>
              <p className="policy-description">{pol.description}</p>

              <div className="policy-mode-selector">
                <span className="mode-label">Sensitivity Mode:</span>
                <div className="segmented-control">
                  {['STRICT', 'BALANCED', 'PERMISSIVE'].map((mode) => (
                    <button
                      key={mode}
                      className={`seg-btn ${pol.mode === mode ? 'active' : ''}`}
                      onClick={() => onUpdatePolicyMode(pol.id, mode)}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="policy-card-footer">
                <div className="policy-stat-col">
                  <span className="stat-title">24h Interceptions</span>
                  <span className="stat-value">{pol.interceptions24h.toLocaleString()}</span>
                </div>
                <div className="policy-stat-col">
                  <span className="stat-title">Overhead</span>
                  <span className="stat-value text-cyan">{pol.latencyImpact}</span>
                </div>
              </div>

              {pol.regulations && pol.regulations.length > 0 && (
                <div className="policy-regs-tags">
                  {pol.regulations.map((reg, idx) => (
                    <span key={idx} className="reg-tag">
                      {reg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Guardrail Modal */}
      {showAddModal && (
        <div className="pg-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="pg-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="pg-modal-header">
              <h3 className="modal-title">Define Custom Guardrail Rule</h3>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="pg-modal-body">
              <div className="form-group">
                <label className="form-label">Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quarantine Internal Source Code Snippets"
                  className="pg-input"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="pg-input"
                    value={newRule.category}
                    onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
                  >
                    <option value="Data Privacy">Data Privacy</option>
                    <option value="AI Safety">AI Safety</option>
                    <option value="Financial Safety">Financial Safety</option>
                    <option value="Healthcare PHI">Healthcare PHI</option>
                    <option value="Secrets & Auth">Secrets & Auth</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sensitivity</label>
                  <select
                    className="pg-input"
                    value={newRule.mode}
                    onChange={(e) => setNewRule({ ...newRule, mode: e.target.value })}
                  >
                    <option value="STRICT">STRICT (Drop & Redact)</option>
                    <option value="BALANCED">BALANCED (Mask Sensitive)</option>
                    <option value="PERMISSIVE">PERMISSIVE (Log & Alert)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description / Scope</label>
                <textarea
                  rows={3}
                  placeholder="Describe the regex patterns, keywords, or token signatures to intercept..."
                  className="pg-input"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Associated Compliance Frameworks (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. GDPR Art. 9, SOC 2 Type II"
                  className="pg-input"
                  value={newRule.regulations}
                  onChange={(e) => setNewRule({ ...newRule, regulations: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="pg-btn pg-btn-ghost"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pg-btn pg-btn-primary"
                >
                  Deploy Rule to Gateway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
