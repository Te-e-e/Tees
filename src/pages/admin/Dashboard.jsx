import { useProjects } from '../../hooks/useProjects';
import { useSiteContent } from '../../hooks/useSiteContent';

export default function Dashboard() {
  const { projects, loading: pLoading } = useProjects(false);
  const { content, loading: cLoading } = useSiteContent();

  const totalProjects = projects.length;
  const visibleProjects = projects.filter((p) => p.visible).length;
  const hiddenProjects = totalProjects - visibleProjects;
  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Overview of your portfolio</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <p className="admin-stat-label">Total Projects</p>
          <p className="admin-stat-value">{pLoading ? '—' : totalProjects}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Visible</p>
          <p className="admin-stat-value">{pLoading ? '—' : visibleProjects}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Hidden</p>
          <p className="admin-stat-value">{pLoading ? '—' : hiddenProjects}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Categories</p>
          <p className="admin-stat-value">{pLoading ? '—' : categories.length}</p>
        </div>
      </div>

      <div className="admin-form-panel" style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 className="admin-form-section-title">Recent Projects</h3>
        {pLoading ? (
          <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>Loading...</p>
        ) : projects.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>
            No projects yet. Go to the Projects page to add your first one!
          </p>
        ) : (
          <div className="admin-table-wrap" style={{ border: 'none' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className={!project.visible ? 'row-hidden' : ''}>
                    <td>
                      {project.image_url ? (
                        <img src={project.image_url} alt="" className="admin-table-thumb" />
                      ) : (
                        <div className="admin-table-thumb" style={{ background: 'var(--bg-elevated)' }} />
                      )}
                    </td>
                    <td style={{ fontWeight: 500 }}>{project.title}</td>
                    <td style={{ color: 'var(--seafoam-green)' }}>{project.category}</td>
                    <td>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: project.visible ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        color: project.visible ? '#4ade80' : '#f87171',
                        border: `1px solid ${project.visible ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                      }}>
                        {project.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-form-panel">
        <h3 className="admin-form-section-title">Current Site Content</h3>
        {cLoading ? (
          <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>Loading...</p>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {Object.entries(content).slice(0, 6).map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--admin-border)',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--seafoam-green)', fontWeight: 500, flexShrink: 0 }}>
                  {key.replace(/_/g, ' ')}
                </span>
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  textAlign: 'right',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
