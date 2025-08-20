import React, { useState } from "react";
import { Table, Badge, Pagination, Button } from "react-bootstrap";

const ArticlesPage = ({ articles, setArticles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Pagination logic
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleStatusToggle = (id) => {
    const updated = articles.map((a) =>
      a.id === id
        ? { ...a, status: a.status === "Published" ? "Draft" : "Published" }
        : a
    );
    setArticles(updated);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="mb-4">Articles</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>
                <Badge
                  pill
                  bg={article.status === "Published" ? "success" : "secondary"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStatusToggle(article.id)}
                >
                  {article.status}
                </Badge>
              </td>
              <td>{article.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default ArticlesPage;
