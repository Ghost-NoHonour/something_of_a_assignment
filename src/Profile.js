import React, { useState } from "react";
import { Card, Container, Row, Col, Image, Form, Button } from "react-bootstrap";

const Profile = () => {
  // Initial user data
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    dateJoined: "2023-01-15",
    profilePic: "https://via.placeholder.com/150"
  });

  const [editing, setEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  // Toggle edit mode
  const toggleEdit = () => setEditing(!editing);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center p-3">
            <Image 
              src={user.profilePic} 
              roundedCircle 
              width={150} 
              height={150} 
              className="mb-3"
            />
            {editing && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
            )}

            <Card.Body>
              {editing ? (
                <>
                  <Form.Group className="mb-2">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="success" onClick={toggleEdit} className="mt-2">
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Card.Title>{user.fullName}</Card.Title>
                  <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                  <Card.Text><strong>Date Joined:</strong> {user.dateJoined}</Card.Text>
                  <Button variant="primary" onClick={toggleEdit}>Edit Profile</Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
