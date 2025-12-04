import React from 'react';
import Sidebar from '../pages/sidebar';
import '../styles/dashboard.css';

const Dashboard = () => {
  // Get current date
  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        {/* Enhanced Header */}
        <header className="main-header">
          <div className="header-content">
            <div className="header-left">
              <div className="breadcrumb">
                <span className="breadcrumb-item">Home</span>
                <i className="bi bi-chevron-right"></i>
                <span className="breadcrumb-item active">Dashboard</span>
              </div>
              <h1 className="header-title">Welcome to Dashboard</h1>
              <p className="header-subtitle">Monitor your analytics, sales, and performance metrics</p>
            </div>
            <div className="header-right">
              <div className="date-display">
                <i className="bi bi-calendar"></i>
                <span>{getCurrentDate()}</span>
              </div>
              <div className="search-bar">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="action-btn notification-btn">
              <i className="bi bi-bell"></i>
              <span className="badge">5</span>
            </button>
            {/* <button 
              className="action-btn theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
            </button> */}
            {/* Fullscreen button removed */}
            <div className="user-profile">
              <div className="user-avatar">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=1488CC&color=fff" alt="User" />
              </div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-email">john@example.com</span>
              </div>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-eye"></i>
            </div>
            <div className="stat-details">
              <span className="stat-label">Total Views</span>
              <span className="stat-value">42.5K</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-cart"></i>
            </div>
            <div className="stat-details">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">3,842</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stat-details">
              <span className="stat-label">Revenue</span>
              <span className="stat-value">$42,580</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-people"></i>
            </div>
            <div className="stat-details">
              <span className="stat-label">Users</span>
              <span className="stat-value">18,429</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Revenue Chart */}
          <div className="dashboard-card card-wide">
            <div className="card-header">
              <h3 className="card-title">Overview</h3>
              <div className="card-actions">
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Centered */}
        <footer className="dashboard-footer">
          <div className="footer-content centered">
            <span>© 2025 Designer Dashboard. All rights reserved.</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;