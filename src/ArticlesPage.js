import React, { useState } from "react";
import { Container, Table, Pagination, Button, Badge, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ArticlesPage = ({ articles, setArticles }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return <Badge pill bg="success">{status}</Badge>;
      case "Draft":
        return <Badge pill bg="secondary">{status}</Badge>;
      default:
        return <Badge pill bg="dark">{status}</Badge>;
    }
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setTempTitle(article.title);
  };

  const handleSave = (id) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id ? { ...article, title: tempTitle } : article
      )
    );
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") handleSave(id);
  };

  return (
    <Container className="mt-4">
      <h2>My Articles</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(article => (
            <tr key={article.id}>
              <td>
                {editingId === article.id ? (
                  <Form.Control
                    type="text"
                    value={tempTitle}
                    onChange={e => setTempTitle(e.target.value)}
                    onBlur={() => handleSave(article.id)}
                    onKeyDown={e => handleKeyDown(e, article.id)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleEdit(article)} style={{ cursor: "pointer" }}>
                    {article.title}
                  </span>
                )}
              </td>
              <td>{getStatusBadge(article.status)}</td>
              <td>{article.lastUpdated}</td>
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

      {/* Back Button at Bottom */}
      <div className="mt-3">
        <Button variant="secondary" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default ArticlesPage;
