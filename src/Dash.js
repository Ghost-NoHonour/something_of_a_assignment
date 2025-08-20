import React, { useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { FaUser, FaFileAlt, FaCog } from "react-icons/fa"; // icons
import './Dashboard.css';

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
        <Nav.Link href="/profile">{collapsed ? <FaUser /> : "Profile"}</Nav.Link>
        <Nav.Link href="/articles">{collapsed ? <FaFileAlt /> : "My Articles"}</Nav.Link>
        <Nav.Link href="/settings">{collapsed ? <FaCog /> : "Settings"}</Nav.Link>
      </Nav>
    </div>
  );
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Container fluid>
      <Row>
        <Col xs={collapsed ? 1 : 2} id="sidebar-wrapper">
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        </Col>
        <Col xs={collapsed ? 11 : 10} id="page-content-wrapper">
          <h2>Author Dashboard</h2>
          <p>This is your main content area.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
