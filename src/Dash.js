import React, { useState } from "react";
import { Container, Row, Col, Button, Nav, Table, Pagination } from "react-bootstrap";
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
        <Nav.Link href="/profile">{collapsed ? "P" : "Profile"}</Nav.Link>
        <Nav.Link href="/articles">{collapsed ? "A" : "My Articles"}</Nav.Link>
        <Nav.Link href="/settings">{collapsed ? "S" : "Settings"}</Nav.Link>
      </Nav>
    </div>
  );
};

// Pagination Table Component
const PaginatedArticles = ({ articles, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />

        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Fake articles for example
  const articles = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Article ${i + 1}`
  }));

  return (
    <Container fluid>
      <Row>
        <Col xs={collapsed ? 1 : 2} id="sidebar-wrapper">
          <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
        </Col>
        <Col xs={collapsed ? 11 : 10} id="page-content-wrapper">
          <h2>Author Dashboard</h2>
          <p>List of your articles:</p>

          {/* Paginated Articles */}
          <PaginatedArticles articles={articles} itemsPerPage={10} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
