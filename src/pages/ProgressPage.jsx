import { useEffect, useState } from "react";
import { Container, Form, Button, Table, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import exercises from "../data/exercises";
import { addProgressEntry, getBookmarks, getProgressEntries } from "../data/database";

export default function ProgressPage(props) {
  const [selectedExerciseId, setSelectedExerciseId] = useState("1");
  const [maxReps, setMaxReps] = useState("");
  const [progressEntries, setProgressEntries] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    loadPageData();
  }, [props.currentUser]);

  async function loadPageData() {
    if (!props.currentUser) {
      setProgressEntries([]);
      setBookmarkedIds([]);
      return;
    }

    const savedProgress = await getProgressEntries(props.currentUser.email);
    const savedBookmarks = await getBookmarks(props.currentUser.email);

    setProgressEntries(savedProgress);
    setBookmarkedIds(savedBookmarks);

    if (savedBookmarks.length > 0) {
      setSelectedExerciseId(savedBookmarks[0].toString());
    }
  }

  async function handleAddEntry(event) {
    event.preventDefault();

    if (maxReps.trim() === "" || Number(maxReps) <= 0) {
      alert("Please enter a valid max rep count.");
      return;
    }

    const selectedExercise = exercises.find((exercise) => {
      return exercise.id === Number(selectedExerciseId);
    });

    await addProgressEntry({
      userEmail: props.currentUser.email,
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      maxReps: Number(maxReps),
      date: new Date().toLocaleDateString()
    });

    setMaxReps("");
    loadPageData();
  }

  function getBestReps(exerciseId) {
    const entries = progressEntries.filter((entry) => entry.exerciseId === exerciseId);

    if (entries.length === 0) {
      return "No entries yet";
    }

    return Math.max(...entries.map((entry) => entry.maxReps));
  }

  const bookmarkedExercises = exercises.filter((exercise) => bookmarkedIds.includes(exercise.id));
  const otherExercises = exercises.filter((exercise) => !bookmarkedIds.includes(exercise.id));

  if (!props.currentUser) {
    return (
      <Container className="mt-4">
        <div className="page-header">
          <h1>Progress Tracker</h1>
          <p>Log in to save max reps and compare your calisthenics progress over time.</p>
        </div>

        <div className="empty-state">
          <p>Please log in to track your progress.</p>
          <Button as={Link} to="/login">
            Go to Login
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="page-header">
        <h1>Progress Tracker</h1>
        <p>
          Track max reps over time. Bookmarked exercises appear first to make the page match your personal training focus.
        </p>
      </div>

      <Row>
        <Col xs={12} lg={5}>
          <Card className="mb-4 content-card">
            <Card.Body>
              <Card.Title as="h2" className="h4">
                Add Max Reps
              </Card.Title>

              <p className="subtle-text">
                Add one short entry after a workout. The newest entries appear first below.
              </p>

              <Form onSubmit={handleAddEntry}>
                <Form.Group className="mb-3" controlId="progress-exercise">
                  <Form.Label>Exercise</Form.Label>
                  <Form.Select
                    value={selectedExerciseId}
                    onChange={(event) => setSelectedExerciseId(event.target.value)}
                  >
                    {bookmarkedExercises.length > 0 && (
                      <optgroup label="Bookmarked Exercises">
                        {bookmarkedExercises.map((exercise) => (
                          <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    <optgroup label="All Other Exercises">
                      {otherExercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </option>
                      ))}
                    </optgroup>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="progress-max-reps">
                  <Form.Label>Max Reps</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
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
        </Col>

        <Col xs={12} lg={7}>
          <section className="page-section filter-panel mt-0" aria-labelledby="bookmark-summary-heading">
            <h2 id="bookmark-summary-heading" className="h4">
              Bookmarked Exercise Summary
            </h2>

            {bookmarkedExercises.length === 0 ? (
              <p>No bookmarked exercises yet.</p>
            ) : (
              <div className="table-wrapper">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Best Max Reps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookmarkedExercises.map((exercise) => (
                      <tr key={exercise.id}>
                        <td>{exercise.name}</td>
                        <td>{getBestReps(exercise.id)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </section>
        </Col>
      </Row>

      <section className="page-section" aria-labelledby="past-reps-heading">
        <h2 id="past-reps-heading" className="h3">
          Past Max Reps
        </h2>

        {progressEntries.length === 0 ? (
          <div className="empty-state">
            <p className="mb-0">No progress entries yet.</p>
          </div>
        ) : (
          <div className="table-wrapper">
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
          </div>
        )}
      </section>
    </Container>
  );
}
