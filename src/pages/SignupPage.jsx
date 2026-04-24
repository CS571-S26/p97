import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setError("Please fill out all fields.");
      return;
    }

    let savedUsers = [];

    if (localStorage.getItem("users")) {
      savedUsers = JSON.parse(localStorage.getItem("users"));
    }

    const emailAlreadyUsed = savedUsers.some((user) => {
      return user.email === email;
    });

    if (emailAlreadyUsed) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password
    };

    const newUsers = [...savedUsers, newUser];

    localStorage.setItem("users", JSON.stringify(newUsers));

    props.onLogin({
      name: name,
      email: email
    });

    navigate("/exercises");
  }

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h1 className="mb-3">Sign Up</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

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
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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