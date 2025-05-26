import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Finance from './pages/Finance';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import { Link } from 'react-router-dom';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div
          style={{
            width: isSidebarOpen ? '250px' : '0',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            backgroundColor: '#333',
            height: '100vh',
            color: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100,
          }}
        >
          <button
            onClick={closeSidebar}
            style={{
              margin: '10px',
              padding: '10px',
              backgroundColor: '#444',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            ← Back
          </button>
          <ul style={{ listStyle: 'none', padding: '20px' }}>
            <li><Link to="/dashboard" onClick={closeSidebar} style={linkStyle}>Bosh sahifa</Link></li>
            <li><Link to="/orders" onClick={closeSidebar} style={linkStyle}>Buyurtmalar</Link></li>
            <li><Link to="/finance" onClick={closeSidebar} style={linkStyle}>Moliyaviy hisobotlar</Link></li>
            <li><Link to="/employees" onClick={closeSidebar} style={linkStyle}>Xodimlar</Link></li>
            <li><Link to="/reports" onClick={closeSidebar} style={linkStyle}>Hisobot</Link></li>
            <li><Link to="/settings" onClick={closeSidebar} style={linkStyle}>Sozlamalar</Link></li>
            <li><Link to="/logout" onClick={closeSidebar} style={linkStyle}>Chiqish</Link></li>
          </ul>
        </div>

   
        <div
          style={{
            marginLeft: isSidebarOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease',
            flex: 1,
            width: '100%',
          }}
        >
          <Navbar toggleSidebar={toggleSidebar} />
          <div style={{ padding: '20px' }}>
            <Routes>
        
              <Route path="/" element={<Dashboard />} />

            
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  padding: '8px 0',
};

export default App;
