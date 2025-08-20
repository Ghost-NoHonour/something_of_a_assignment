import React from "react";
import { Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaFileAlt, FaHome } from "react-icons/fa";

const Sidebar = ({ collapsed, toggleSidebar, user }) => {
  return (
    <div
      className={`sidebar bg-light d-flex flex-column justify-content-between`}
      style={{
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        transition: "width 0.3s",
        width: collapsed ? "70px" : "220px",
        padding: "15px"
      }}
    >
      <div>
        {/* Profile at top */}
        {!collapsed && (
          <div className="text-center mb-4">
            <Image
              src={user.profilePic}
              roundedCircle
              width={70}
              height={70}
              style={{ border: "2px solid #0d6efd" }}
            />
            <h6 className="mt-2 fw-bold">{user.fullName}</h6>
          </div>
        )}

        {/* Navigation */}
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/profile"
            className="d-flex align-items-center mb-2"
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <FaUser className="me-2" size={20} />
            {!collapsed && <span>Profile</span>}
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/articles"
            className="d-flex align-items-center mb-2"
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <FaFileAlt className="me-2" size={20} />
            {!collapsed && <span>My Articles</span>}
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/"
            className="d-flex align-items-center mb-2"
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <FaHome className="me-2" size={20} />
            {!collapsed && <span>Dashboard</span>}
          </Nav.Link>
        </Nav>
      </div>

      {/* Toggle button at bottom */}
      <div className="text-center mt-3">
        <Button
          variant="primary"
          size="sm"
          onClick={toggleSidebar}
          style={{ width: "100%" }}
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
