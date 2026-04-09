import { Container, Form, Button, Card } from "react-bootstrap";

export default function SignupPage() {
  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h1 className="mb-3">Sign Up</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Create a password" />
            </Form.Group>

            <Button variant="success" disabled>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}