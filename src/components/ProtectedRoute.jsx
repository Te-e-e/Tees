import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--admin-bg)',
      }}>
        <div className="loading-spinner" />
        <style>{`
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-subtle);
            border-top-color: var(--sakura-pink);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}
