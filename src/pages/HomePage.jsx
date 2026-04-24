import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container className="mt-4">
      <h1>Welcome to Calisthenics Hub</h1>

      <p>
        This website helps users learn calisthenics exercises, save exercises,
        track progress, and discuss training.
      </p>

      <div className="mb-4">
        <Button as={Link} to="/exercises" className="me-2">
          View Exercises
        </Button>

        <Button as={Link} to="/forum" variant="outline-primary" className="me-2">
          Visit Forum
        </Button>

        <Button as={Link} to="/resources" variant="outline-secondary">
          Resources
        </Button>
      </div>

      <Row>
        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Learn Exercises</Card.Title>
              <Card.Text>
                Search and filter exercises by muscle group, difficulty, and equipment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Track Progress</Card.Title>
              <Card.Text>
                Users can record max repetitions and view past entries.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Use the Forum</Card.Title>
              <Card.Text>
                Dicuss calisthenics with others.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}