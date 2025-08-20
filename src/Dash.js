import React, { useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile"; // import the profile page
import ArticlesPage from "./ArticlesPage"; 
import './Dashboard.css';

// Sidebar Component
const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar bg-light ${collapsed ? "collapsed" : ""}`}>
      <Button 
        variant="primary" 
        className="toggle-btn mb-3"
        onClick={toggleSidebar}
      >
        {collapsed ? "→" : "←"}
      </Button>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/profile">{collapsed ? "P" : "Profile"}</Nav.Link>
        <Nav.Link as={Link} to="/articles">{collapsed ? "A" : "My Articles"}</Nav.Link>
        <Nav.Link as={Link} to="/settings">{collapsed ? "S" : "Settings"}</Nav.Link>
      </Nav>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Fake articles for example
  const articles = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Article ${i + 1}`
  }));

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={collapsed ? 1 : 2} id="sidebar-wrapper">
            <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
          </Col>
          <Col xs={collapsed ? 11 : 10} id="page-content-wrapper">
            <Routes>
              <Route path="/profile" element={<Profile />} />
  <Route path="/articles" element={<ArticlesPage />} />
  <Route path="/settings" element={<h2>Settings Page (Coming Soon)</h2>} />
  <Route path="*" element={<h2>Welcome to your Dashboard!</h2>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default Dashboard;
