import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container className="mt-4">
      <h1>Welcome to Calisthenics Hub</h1>
      <p>
        This website helps users learn calisthenics exercises and connects users through calisthenics.
      </p>
      <Button as={Link} to="/exercises" className="mt-3">
        View Exercises
      </Button>
    </Container>
  );
}