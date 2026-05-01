import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container className="mt-4">
      <section className="hero-panel" aria-labelledby="home-heading">
        <h1 id="home-heading">Calisthenics Hub</h1>

        <p>
          Learn bodyweight exercises, save useful movements, track your max reps, and ask questions in the training forum.
        </p>
      </section>

      <Row className="mt-4">
        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100 content-card feature-card">
            <Card.Body>
              <Card.Title as="h2" className="h5">Exercise Library</Card.Title>
              <Card.Text>
                Search and filter calisthenics exercises by muscle group, difficulty, and equipment.
              </Card.Text>

              <Button as={Link} to="/exercises" variant="primary">
                View Exercises
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100 content-card feature-card">
            <Card.Body>
              <Card.Title as="h2" className="h5">Training Forum</Card.Title>
              <Card.Text>
                Ask questions, post updates, upload images, and comment on other users' posts.
              </Card.Text>

              <Button as={Link} to="/forum" variant="primary">
                Visit Forum
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100 content-card feature-card">
            <Card.Body>
              <Card.Title as="h2" className="h5">Resources</Card.Title>
              <Card.Text>
                View calisthenics resource categories.
              </Card.Text>

              <Button as={Link} to="/resources" variant="primary">
                Resources
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
