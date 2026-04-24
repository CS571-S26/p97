import { Container, Row, Col, Card } from "react-bootstrap";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Beginner Exercises",
      description: "Basic exercises and starting points for new calisthenics users."
    },
    {
      title: "Training Programme",
      description: "Workout plans and training routines."
    },
    {
      title: "Content Creator Recommendations",
      description: "Calisthenics content creators."
    }
  ];

  return (
    <Container className="mt-4">
      <h1>Calisthenics Resources</h1>

      <p>
        Extra calisthenics resources.
      </p>

      <Row>
        {resources.map((resource, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}