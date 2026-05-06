import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';

const CATEGORIES = ['Weapon', 'Character', 'Prop'];
const TAG_OPTIONS = ['PBR', 'Low-poly', 'High-poly', 'Hand-painted', 'Stylized', 'Realistic', 'Game-ready'];

export default function ProjectForm({ project, onClose, onSuccess }) {
  const isEditing = !!project;
  const { createProject, updateProject } = useProjects(false);
  const [title, setTitle] = useState(project?.title || '');
  const [category, setCategory] = useState(project?.category || 'Prop');
  const [description, setDescription] = useState(project?.description || '');
  const [tags, setTags] = useState(project?.tags || []);
  const [visible, setVisible] = useState(project?.visible ?? true);
  const [imageFile, setImageFile] = useState(null);
  const [beforeImageFile, setBeforeImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(project?.image_url || '');
  const [beforePreview, setBeforePreview] = useState(project?.image_before_url || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const toggleTag = (tag) => setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleImageSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === 'main') { setImageFile(file); setImagePreview(url); }
    else { setBeforeImageFile(file); setBeforePreview(url); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setSaving(true); setError('');
    try {
      const data = { title: title.trim(), category, description: description.trim(), tags, visible };
      if (isEditing) { await updateProject(project.id, data, imageFile, beforeImageFile); onSuccess('Project updated'); }
      else { await createProject(data, imageFile, beforeImageFile); onSuccess('Project created'); }
    } catch (err) { setError(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isEditing ? 'Edit Project' : 'New Project'}</h1>
          <p className="admin-page-subtitle">{isEditing ? `Editing: ${project.title}` : 'Add a new asset'}</p>
        </div>
        <button className="btn btn-secondary" onClick={onClose}>← Back</button>
      </div>
      <form className="admin-form-panel" onSubmit={handleSubmit}>
        {error && <div className="login-error" style={{marginBottom:'var(--space-md)'}}>{error}</div>}
        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="pt">Title *</label>
            <input id="pt" type="text" className="form-input" value={title} onChange={e=>setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="pc">Category</label>
            <select id="pc" className="form-select" value={category} onChange={e=>setCategory(e.target.value)}>
              {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group admin-form-full">
            <label className="form-label" htmlFor="pd">Description</label>
            <textarea id="pd" className="form-textarea" value={description} onChange={e=>setDescription(e.target.value)} rows={4} />
          </div>
          <div className="form-group admin-form-full">
            <label className="form-label">Tags</label>
            <div className="tag-selector">
              {TAG_OPTIONS.map(tag=>(
                <button key={tag} type="button" className={`tag-option ${tags.includes(tag)?'selected':''}`} onClick={()=>toggleTag(tag)}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Main Image</label>
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={e=>handleImageSelect(e,'main')} />
              {imagePreview ? <img src={imagePreview} alt="Preview" className="image-upload-preview" /> : <p className="image-upload-text">Click to upload</p>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Before Image (optional)</label>
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={e=>handleImageSelect(e,'before')} />
              {beforePreview ? <img src={beforePreview} alt="Before" className="image-upload-preview" /> : <p className="image-upload-text">For Before/After slider</p>}
            </div>
          </div>
          <div className="form-group admin-form-full">
            <label className="form-label">Visibility</label>
            <div style={{display:'flex',alignItems:'center',gap:'var(--space-sm)'}}>
              <label className="toggle"><input type="checkbox" checked={visible} onChange={e=>setVisible(e.target.checked)} /><span className="toggle-slider" /></label>
              <span style={{fontSize:'0.9rem',color:'var(--text-secondary)'}}>{visible?'Visible':'Hidden'}</span>
            </div>
          </div>
        </div>
        <div className="admin-form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving?'Saving...':isEditing?'Save Changes':'Create Project'}</button>
        </div>
      </form>
    </div>
  );
}
