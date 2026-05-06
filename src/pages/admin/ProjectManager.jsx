import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import ProjectForm from './ProjectForm';

export default function ProjectManager() {
  const { projects, loading, deleteProject, toggleVisibility } = useProjects(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = (msg) => {
    handleFormClose();
    showToast(msg || 'Project saved successfully');
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setDeleteConfirm(null);
      showToast('Project deleted');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleToggle = async (id, currentVisible) => {
    try {
      await toggleVisibility(id, !currentVisible);
      showToast(`Project ${!currentVisible ? 'shown' : 'hidden'}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-subtitle">Manage your portfolio assets</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd} id="add-project-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="admin-form-panel text-center" style={{ padding: 'var(--space-3xl)' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>No projects yet.</p>
          <button className="btn btn-primary" onClick={handleAdd}>Add Your First Project</button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Visible</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className={!project.visible ? 'row-hidden' : ''}>
                  <td>
                    {project.image_url ? (
                      <img src={project.image_url} alt="" className="admin-table-thumb" />
                    ) : (
                      <div className="admin-table-thumb" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-muted)', fontSize: '0.7rem'
                      }}>
                        No img
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 500 }}>{project.title}</td>
                  <td style={{ color: 'var(--seafoam-green)', fontSize: '0.85rem' }}>{project.category}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="gallery-card-tag">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={project.visible}
                        onChange={() => handleToggle(project.id, project.visible)}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        className="btn-icon btn-secondary"
                        onClick={() => handleEdit(project)}
                        title="Edit"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => setDeleteConfirm(project.id)}
                        title="Delete"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            maxWidth: 400, padding: 'var(--space-xl)', textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Delete Project?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem' }}>
              This action cannot be undone. The project will be permanently removed.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
