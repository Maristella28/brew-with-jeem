import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="not-found-container">
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </div>
      <div className="not-found-content">
        <i className="fas fa-coffee" style={{ fontSize: '80px', color: '#8B4513', marginBottom: '20px' }}></i>
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go to Home
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <p style={{ marginTop: '20px' }}>
          Or return to our <Link to="/" style={{ color: '#8B4513', fontWeight: 'bold' }}>homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;

