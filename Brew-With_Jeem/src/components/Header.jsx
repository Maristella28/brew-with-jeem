import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // Apply dark mode on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      navigate('/login');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.hash === '#home';
    }
    return location.hash === path;
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <i className="fas fa-coffee"></i>
          <span>Brew with Jeem</span>
        </div>
        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              className={isActive('#home') ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#menu" 
              className={isActive('#menu') ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('menu');
              }}
            >
              Menu
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={isActive('#about') ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={isActive('#contact') ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="nav-icons">
          {isAuthenticated && (
            <>
              <i 
                className="fas fa-user" 
                style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '16px' }}
                title={user ? `${user.first_name} ${user.last_name}` : 'Profile'}
              ></i>
              <i 
                className="fas fa-sign-out-alt" 
                onClick={handleLogout}
                style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '12px' }}
                title="Sign Out"
              ></i>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              <i 
                className="fas fa-sign-in-alt" 
                style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '16px' }}
                title="Login"
              ></i>
            </Link>
          )}
          <i 
            className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}
            onClick={toggleDarkMode}
            style={{ fontSize: '30px', cursor: 'pointer', marginLeft: '16px' }}
          ></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;

