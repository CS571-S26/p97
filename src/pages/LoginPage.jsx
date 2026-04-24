import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    let savedUsers = [];

    if (localStorage.getItem("users")) {
      savedUsers = JSON.parse(localStorage.getItem("users"));
    }

    const foundUser = savedUsers.find((user) => {
      return user.email === email && user.password === password;
    });

    if (!foundUser) {
      setError("Email or password is incorrect.");
      return;
    }

    props.onLogin({
      name: foundUser.name,
      email: foundUser.email
    });

    navigate("/exercises");
  }

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h1 className="mb-3">Login</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>

          <p className="mt-3">
            Do not have an account? <Link to="/signup">Sign up here.</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}