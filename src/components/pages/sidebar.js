import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
// import logo from "../assest/logo.jpeg";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const Menus = [
    { title: "Dashboard", icon: "bi-house-door" },
    { title: "Accounts", icon: "bi-person", gap: true },
    { title: "Files", icon: "bi-folder", gap: true },
    { title: "Setting", icon: "bi-gear",gap:true },
    { title: "Logout", icon: "bi-box-arrow-right", gap: true },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update body class based on sidebar state
  useEffect(() => {
    if (open) {
      document.body.classList.remove('sidebar-closed');
    } else {
      document.body.classList.add('sidebar-closed');
    }
  }, [open]);

  // Touch swipe handling
  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50; 
      const swipeDistance = touchEndX - touchStartX;

      // Left swipe (close sidebar)
      if (swipeDistance < -swipeThreshold && open) {
        setOpen(false);
      }
      // Right swipe (open sidebar)
      else if (swipeDistance > swipeThreshold && !open) {
        setOpen(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, open]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !open) return;

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, open]);

  const handleMenuClick = (title) => {
    if (title === "Logout") {
      handleLogout();
    } else {
      setActiveMenu(title);
      // Close sidebar on mobile after selecting a menu item
      if (isMobile) {
        setTimeout(() => setOpen(false), 200);
      }
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    toast.success("Logout successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="app-container">
      {/* Mobile overlay when sidebar is open */}
      {isMobile && open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>
      )}
      
      <div 
        ref={sidebarRef}
        className={`sidebar ${open ? "open" : "closed"} ${darkMode ? "dark" : "light"} animate-sidebar ${isMobile ? "mobile-sidebar" : ""}`}
      >
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <i className={`bi bi-chevron-${open ? "left" : "right"}`}></i>
        </div>
        
        <div className="sidebar-header">
          <div className="logo-icon">
            <i className="bi bi-palette"></i>
             {/* <img src={logo} alt="Logo" /> */}
          </div>
          <h1 className={`sidebar-title ${!open && "hidden"}`}>
            <span className="logo-text">FlareMinds</span>
            <span className="logo-subtitle">tec</span>
          </h1>
          <div className="header-theme-switch" onClick={toggleTheme}>
            <i className="bi bi-sun header-sun-icon"></i>
            <i className="bi bi-moon header-moon-icon"></i>
            <div className="header-switch-handle" style={{ transform: darkMode ? "translateX(0)" : "translateX(34px)" }}></div>
          </div>
        </div>
        
        {/* <div className="sidebar-user">
          <div className="user-avatar-sidebar">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className={`user-info-sidebar ${!open && "hidden"}`}>
            <h4>John Doe</h4>
            <p>Administrator</p>
          </div>
        </div> */}
        
        <ul className="sidebar-menu">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`menu-item ${Menu.gap ? "mt-4" : ""} ${activeMenu === Menu.title ? "active" : ""} ${Menu.title === "Logout" ? "logout-item" : ""}`}
              onClick={() => handleMenuClick(Menu.title)}
            >
              <div className="menu-link">
                <i className={`menu-icon ${Menu.icon}`}></i>
                <span className={`menu-text ${!open && "hidden"}`}>
                  {Menu.title}
                </span>
                {Menu.badge && (
                  <span className={`menu-badge ${!open && "hidden"}`}>
                    {Menu.badge}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <div className="sidebar-footer">
          {/* Footer content can be added here */}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-box">
            <div className="logout-modal-header">
              <i className="bi bi-box-arrow-right logout-modal-icon"></i>
              <h2>Confirm Logout</h2>
            </div>
            <p className="logout-modal-message">Are you sure you want to logout?</p>
            <div className="logout-modal-buttons">
              <button 
                className="logout-btn logout-btn-confirm"
                onClick={confirmLogout}
              >
                <i className="bi bi-check-circle"></i> Logout
              </button>
              <button 
                className="logout-btn logout-btn-cancel"
                onClick={cancelLogout}
              >
                <i className="bi bi-x-circle"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;