import { useEffect, useState } from "react";
import { Container, Form, Button, Table, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import exercises from "../data/exercises";

export default function ProgressPage(props) {
  const [selectedExerciseId, setSelectedExerciseId] = useState("1");
  const [maxReps, setMaxReps] = useState("");
  const [progressEntries, setProgressEntries] = useState([]);

  useEffect(() => {
    if (props.currentUser) {
      const progressKey = "progress_" + props.currentUser.email;

      let savedProgress = [];

      if (localStorage.getItem(progressKey)) {
        savedProgress = JSON.parse(localStorage.getItem(progressKey));
      }

      setProgressEntries(savedProgress);
    } else {
      setProgressEntries([]);
    }
  }, [props.currentUser]);

  function handleAddEntry(event) {
    event.preventDefault();

    if (maxReps.trim() === "" || Number(maxReps) <= 0) {
      alert("Please enter a valid max rep count.");
      return;
    }

    const selectedExercise = exercises.find((exercise) => {
      return exercise.id === Number(selectedExerciseId);
    });

    const newEntry = {
      id: Date.now(),
      exerciseName: selectedExercise.name,
      maxReps: Number(maxReps),
      date: new Date().toLocaleDateString()
    };

    const newProgressEntries = [newEntry, ...progressEntries];
    const progressKey = "progress_" + props.currentUser.email;

    setProgressEntries(newProgressEntries);
    localStorage.setItem(progressKey, JSON.stringify(newProgressEntries));
    setMaxReps("");
  }

  if (!props.currentUser) {
    return (
      <Container className="mt-4">
        <h1>Progress Tracker</h1>
        <p>Please log in to track your progress.</p>
        <Button as={Link} to="/login">
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Progress Tracker</h1>

      <Card className="mt-3 mb-4">
        <Card.Body>
          <h4>Add Max Reps</h4>

          <Form onSubmit={handleAddEntry}>
            <Form.Group className="mb-3">
              <Form.Label>Exercise</Form.Label>
              <Form.Select
                value={selectedExerciseId}
                onChange={(event) => setSelectedExerciseId(event.target.value)}
              >
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Reps</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 20"
                value={maxReps}
                onChange={(event) => setMaxReps(event.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="success">
              Save Progress
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h4>Past Max Reps</h4>

      {progressEntries.length === 0 ? (
        <p>No progress entries yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Exercise</th>
              <th>Max Reps</th>
            </tr>
          </thead>

          <tbody>
            {progressEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.exerciseName}</td>
                <td>{entry.maxReps}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}