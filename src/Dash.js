import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./SideBar";
import Profile from "./Profile";
import ArticlesPage from "./ArticlesPage";
import pp from "./components/pp.png";
import { Routes, Route, Link } from "react-router-dom";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [user, setUser] = useState({
    fullName: "Noth Ingcre Ative",
    email: "doingsomethin11@gmail.com",
    dateJoined: "2023-01-15",
    profilePic: pp
  });

  const [articles, setArticles] = useState([
  { id: 1, title: "Understanding React Hooks", status: "Published", lastUpdated: "2025-08-01" },
  { id: 2, title: "A Beginner's Guide to Node.js", status: "Draft", lastUpdated: "2025-08-02" },
  { id: 3, title: "CSS Grid vs Flexbox: Practical Examples", status: "Published", lastUpdated: "2025-08-03" },
  { id: 4, title: "Async/Await in JavaScript Explained", status: "Draft", lastUpdated: "2025-08-04" },
  { id: 5, title: "Introduction to TypeScript", status: "Published", lastUpdated: "2025-08-05" },
  { id: 6, title: "Building a REST API with Express", status: "Published", lastUpdated: "2025-08-06" },
  { id: 7, title: "Understanding Redux for State Management", status: "Draft", lastUpdated: "2025-08-07" },
  { id: 8, title: "Responsive Web Design Best Practices", status: "Published", lastUpdated: "2025-08-08" },
  { id: 9, title: "Getting Started with Next.js", status: "Draft", lastUpdated: "2025-08-09" },
  { id: 10, title: "Web Accessibility Guidelines", status: "Published", lastUpdated: "2025-08-10" },
  { id: 11, title: "Deploying React Apps to Netlify", status: "Published", lastUpdated: "2025-08-11" },
  { id: 12, title: "Unit Testing with Jest and React Testing Library", status: "Draft", lastUpdated: "2025-08-12" },
  { id: 13, title: "Using Context API vs Redux", status: "Published", lastUpdated: "2025-08-13" },
  { id: 14, title: "Modern CSS Techniques: Variables and Flexbox", status: "Draft", lastUpdated: "2025-08-14" },
  { id: 15, title: "Optimizing React Performance", status: "Published", lastUpdated: "2025-08-15" },
  { id: 16, title: "Introduction to GraphQL with React", status: "Draft", lastUpdated: "2025-08-16" },
  { id: 17, title: "Handling Forms in React Efficiently", status: "Published", lastUpdated: "2025-08-17" },
  { id: 18, title: "React Router v6: Tips and Tricks", status: "Draft", lastUpdated: "2025-08-18" },
  { id: 19, title: "Building a Blog with Gatsby", status: "Published", lastUpdated: "2025-08-19" },
  { id: 20, title: "Authentication in React Apps", status: "Draft", lastUpdated: "2025-08-20" },
  { id: 21, title: "Using Tailwind CSS with React", status: "Published", lastUpdated: "2025-08-21" },
  { id: 22, title: "State Management with Recoil", status: "Draft", lastUpdated: "2025-08-22" },
  { id: 23, title: "Building a Portfolio Website in React", status: "Published", lastUpdated: "2025-08-23" },
  { id: 24, title: "Integrating Firebase with React", status: "Draft", lastUpdated: "2025-08-24" },
  { id: 25, title: "Using React Query for Data Fetching", status: "Published", lastUpdated: "2025-08-25" }
]);

  // Dashboard home showing clickable articles
  const DashboardHome = () => (
    <Container>
      <h2 className="mb-4">Author Dashboard</h2>
      <Row>
        {articles.slice(0, 5).map((article) => (
          <Col md={4} key={article.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>
                  <Link to="/articles">{article.title}</Link>
                </Card.Title>
                <Card.Text>Status: {article.status}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );

  return (
    <Container fluid>
      <Row>
        <Col xs={collapsed ? 1 : 2} id="sidebar-wrapper">
          <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} user={user} />
        </Col>
        <Col xs={collapsed ? 11 : 10} id="page-content-wrapper">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/articles" element={<ArticlesPage articles={articles} setArticles={setArticles} />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
