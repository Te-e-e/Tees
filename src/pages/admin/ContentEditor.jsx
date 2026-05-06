import { useState, useEffect } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';

export default function ContentEditor() {
  const { content, loading, updateMultiple } = useSiteContent();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { if (!loading) setForm({ ...content }); }, [content, loading]);

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateMultiple(form);
      setToast({ message: 'Content saved successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
      setTimeout(() => setToast(null), 4000);
    } finally { setSaving(false); }
  };

  if (loading) return <div className="loading-state"><div className="loading-spinner" /><p>Loading content...</p></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Content Editor</h1>
          <p className="admin-page-subtitle">Update your site text without redeploying</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving} id="save-content-btn">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="admin-form-panel" style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 className="admin-form-section-title">Hero Section</h3>
        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" value={form.hero_title || ''} onChange={e => handleChange('hero_title', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Subtitle</label>
            <input className="form-input" value={form.hero_subtitle || ''} onChange={e => handleChange('hero_subtitle', e.target.value)} />
          </div>
          <div className="form-group admin-form-full">
            <label className="form-label">Bio</label>
            <textarea className="form-textarea" value={form.hero_bio || ''} onChange={e => handleChange('hero_bio', e.target.value)} rows={3} />
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      {[1, 2, 3].map(tier => (
        <div className="admin-form-panel" key={tier} style={{ marginBottom: 'var(--space-lg)' }}>
          <h3 className="admin-form-section-title">Pricing Tier {tier} {tier === 2 ? '(Featured)' : ''}</h3>
          <div className="admin-form-grid">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={form[`pricing_tier${tier}_name`] || ''} onChange={e => handleChange(`pricing_tier${tier}_name`, e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input className="form-input" type="number" value={form[`pricing_tier${tier}_price`] || ''} onChange={e => handleChange(`pricing_tier${tier}_price`, e.target.value)} />
            </div>
            <div className="form-group admin-form-full">
              <label className="form-label">Features (semicolon-separated)</label>
              <textarea className="form-textarea" value={form[`pricing_tier${tier}_features`] || ''} onChange={e => handleChange(`pricing_tier${tier}_features`, e.target.value)} rows={3} placeholder="Feature 1;Feature 2;Feature 3" />
            </div>
          </div>
        </div>
      ))}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
