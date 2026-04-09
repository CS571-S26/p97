import { Container, Form, Button, Card } from "react-bootstrap";

export default function LoginPage() {
  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h1 className="mb-3">Login</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            <Button variant="primary" disabled>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}