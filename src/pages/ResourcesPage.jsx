import { Container, Row, Col, Card } from "react-bootstrap";

export default function ResourcesPage() {
  const creators = [
    {
      name: "CHRIS HERIA",
      youtube: "https://www.youtube.com/@CHRISHERIA",
      description:
        "Chris Heria makes calisthenics and bodyweight training videos. His channel is useful for learning workouts, basic routines, and advanced skill progressions. He often shows exercises that can be done with little equipment."
    },
    {
      name: "Frank Medrano",
      youtube: "https://www.youtube.com/@frank_medrano",
      description:
        "Frank Medrano is known for advanced bodyweight strength and calisthenics skills. His videos show movements like muscle-ups, levers, and intense bodyweight workouts. He is a good recommendation for users who want inspiration for higher-level calisthenics training."
    }
  ];

  return (
    <Container className="mt-4">
      <div className="page-header">
        <h1>Calisthenics Resources</h1>
        <p>
          Recommended calisthenics content creators.
        </p>
      </div>

      <section className="page-section" aria-labelledby="resources-heading">
        <h2 id="resources-heading" className="h3">
          Content Creator Recommendations
        </h2>

        <Row>
          {creators.map((creator) => (
            <Col key={creator.name} xs={12} md={6} className="mb-4">
              <Card className="h-100 resource-card">
                <Card.Body>
                  <Card.Title as="h3" className="h5">
                    <a
                      href={creator.youtube}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {creator.name}
                    </a>
                  </Card.Title>

                  <Card.Text>{creator.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}
