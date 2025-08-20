import React from "react";
import { Card, Container, Row, Col, Image, Form, Button } from "react-bootstrap";

const Profile = ({ user, setUser }) => {
  const [editing, setEditing] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const toggleEdit = () => setEditing(!editing);

  return (
    <Container
      fluid
      className="d-flex justify-content-center mt-5" // card centered horizontally
    >
      <Row className="justify-content-center w-100">
        <Col md={6} lg={5}>
          <Card className="text-center p-4 shadow-sm">
            {/* Profile Picture at top center */}
            <div className="d-flex justify-content-center">
              <Image
                src={user.profilePic}
                roundedCircle
                width={120}
                height={120}
                className="mb-3"
                style={{ border: "2px solid #0d6efd" }}
              />
            </div>

            {/* Edit picture option */}
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
