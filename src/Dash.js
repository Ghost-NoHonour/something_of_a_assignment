import React, { useState } from "react";
import { Container, Row, Col, Button, Nav, Card, Image } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaUser, FaFileAlt, FaCog } from "react-icons/fa"; // icons
import Profile from "./Profile";
import ArticlesPage from "./ArticlesPage";
import { FaHome } from "react-icons/fa"; 
import './Dashboard.css';

// Sidebar Component
const Sidebar = ({ collapsed, toggleSidebar, username, profilePic }) => (
  <div className={`sidebar bg-light d-flex flex-column justify-content-between ${collapsed ? "collapsed" : ""}`} style={{ height: "100vh" }}>
    
    <div>
      {/* Profile at top */}
      {!collapsed && (
        <div className="text-center p-3">
          <Image src={profilePic} roundedCircle width={60} height={60} />
          <h6 className="mt-2 fw-bold">{username}</h6>
        </div>
      )}
      
      <Button 
        variant="primary" 
        className="toggle-btn mb-3"
        onClick={toggleSidebar}
      >
        {collapsed ? "→" : "←"}
      </Button>
      
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
          <FaUser className="me-2" /> {!collapsed && "Profile"}
        </Nav.Link>
        <Nav.Link as={Link} to="/articles" className="d-flex align-items-center">
          <FaFileAlt className="me-2" /> {!collapsed && "My Articles"}
        </Nav.Link>
        <Nav.Link as={Link} to="/" className="d-flex align-items-center">
          <FaHome className="me-2" /> {!collapsed && "Dashboard"}
        </Nav.Link>
      </Nav>
    </div>
  </div>
);

// Dashboard Homepage Component
const HomeDashboard = ({ articles }) => {
  const recentArticles = articles.slice(0, 5);

  return (
    <div>
      <h2>Author Dashboard</h2>
      <p>Welcome to your dashboard! Here are your recent articles:</p>
      <Row>
        {recentArticles.map(article => (
          <Col md={6} lg={4} key={article.id} className="mb-3">
            <Card as={Link} to="/articles" style={{ cursor: "pointer", textDecoration: "none" }}>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{article.status}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Shared articles state
  const [articles, setArticles] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Article ${i + 1}`,
      status: i % 2 === 0 ? "Published" : "Draft",
      lastUpdated: `2025-08-${String((i % 30) + 1).padStart(2, "0")}`
    }))
  );

  // Example user info
  const username = "John Doe";
  const profilePic = "https://via.placeholder.com/60";

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={collapsed ? 1 : 2} id="sidebar-wrapper" className="p-0">
            <Sidebar 
              collapsed={collapsed} 
              toggleSidebar={() => setCollapsed(!collapsed)} 
              username={username}
              profilePic={profilePic}
            />
          </Col>
          <Col xs={collapsed ? 11 : 10} id="page-content-wrapper">
            <Routes>
              <Route path="/" element={<HomeDashboard articles={articles} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/articles" element={<ArticlesPage articles={articles} setArticles={setArticles} />} />
              <Route path="/settings" element={<h2>Settings Page (Coming Soon)</h2>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default Dashboard;
