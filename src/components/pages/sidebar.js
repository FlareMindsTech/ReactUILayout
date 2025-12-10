import { useState, useEffect, useRef } from "react"; // useEffect, useRef சேர்க்கவும்
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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
      const swipeThreshold = 50; // minimum swipe distance in pixels
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
    toast.info(
      <div>
        <p>Are you sure you want to logout?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button 
            className="btn-confirm" 
            onClick={() => {
              toast.dismiss();
              confirmLogout();
            }}
            style={{
              background: '#1488CC',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Yes, Logout
          </button>
          <button 
            className="btn-cancel"
            onClick={() => toast.dismiss()}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const confirmLogout = () => {
    toast.success("Logout successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
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
          </div>
          <h1 className={`sidebar-title ${!open && "hidden"}`}>
            <span className="logo-text">FlareMinds</span>
            <span className="logo-subtitle">tec</span>
          </h1>
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
          <div className="footer-content-sidebar">
            <div className="theme-switch" onClick={toggleTheme}>
              <i className="bi bi-sun theme-icon sun-icon"></i>
              <i className="bi bi-moon theme-icon moon-icon"></i>
              <div className="switch-handle" style={{ transform: darkMode ? "translateX(0)" : "translateX(34px)" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;