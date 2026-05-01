import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FeatureCard(props) {
  return (
    <Card className="h-100 content-card feature-card">
      <Card.Body>
        <Card.Title as="h2" className="h5">
          {props.title}
        </Card.Title>

        <Card.Text>{props.description}</Card.Text>

        <Button as={Link} to={props.link} variant="primary">
          {props.buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}
