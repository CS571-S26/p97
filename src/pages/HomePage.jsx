import { Container, Row, Col } from "react-bootstrap";
import FeatureCard from "../components/FeatureCard";

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
          <FeatureCard
            title="Exercise Library"
            description="Search and filter calisthenics exercises by muscle group, difficulty, and equipment."
            link="/exercises"
            buttonText="View Exercises"
          />
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <FeatureCard
            title="Training Forum"
            description="Ask questions, post updates, upload images, and comment on other users' posts."
            link="/forum"
            buttonText="Visit Forum"
          />
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <FeatureCard
            title="Resources"
            description="View calisthenics resource categories that can later hold links or videos."
            link="/resources"
            buttonText="Resources"
          />
        </Col>
      </Row>
    </Container>
  );
}
