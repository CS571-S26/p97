import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addUser, getUserByEmail } from "../data/database";

export default function SignupPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName === "" || cleanEmail === "" || password.trim() === "") {
      setError("Please fill out all fields.");
      return;
    }

    const existingUser = await getUserByEmail(cleanEmail);

    if (existingUser) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      password: password
    };

    await addUser(newUser);

    props.onLogin({
      name: cleanName,
      email: cleanEmail
    });

    navigate("/exercises");
  }

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="content-card" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h1 className="mb-3">Sign Up</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signup-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signup-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signup-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Sign Up
            </Button>
          </Form>

          <p className="mt-3">
            Already have an account? <Link to="/login">Login here.</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
