import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exercises from "../data/exercises";
import { getBookmarks, removeBookmark, getProgressEntries } from "../data/database";

export default function BookmarkedPage(props) {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [progressEntries, setProgressEntries] = useState([]);

  useEffect(() => {
    loadPageData();
  }, [props.currentUser]);

  async function loadPageData() {
    if (!props.currentUser) {
      setBookmarkedIds([]);
      setProgressEntries([]);
      return;
    }

    const savedBookmarks = await getBookmarks(props.currentUser.email);
    const savedProgress = await getProgressEntries(props.currentUser.email);

    setBookmarkedIds(savedBookmarks);
    setProgressEntries(savedProgress);
  }

  async function handleToggleBookmark(id) {
    if (!props.currentUser) {
      return;
    }

    await removeBookmark(props.currentUser.email, id);
    loadPageData();
  }

  function handleProgressSaved() {
    loadPageData();
  }

  const bookmarkedExercises = exercises.filter((exercise) =>
    bookmarkedIds.includes(exercise.id)
  );

  function getBestReps(exerciseId) {
    const entries = progressEntries.filter((entry) => entry.exerciseId === exerciseId);

    if (entries.length === 0) {
      return "No entries yet";
    }

    return Math.max(...entries.map((entry) => entry.maxReps));
  }

  function getLatestDate(exerciseId) {
    const entries = progressEntries.filter((entry) => entry.exerciseId === exerciseId);

    if (entries.length === 0) {
      return "No entries yet";
    }

    return entries[0].date;
  }

  if (!props.currentUser) {
    return (
      <Container className="mt-4">
        <div className="page-header">
          <h1>Bookmarked Exercises</h1>
          <p>Log in to save exercises and view your personal training list.</p>
        </div>

        <div className="empty-state">
          <p>Please log in to view your bookmarked exercises.</p>
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
        <h1>Bookmarked Exercises</h1>
        <p>
          Your saved exercises are grouped with progress data so favorites and tracking feel connected.
        </p>
      </div>

      <Row className="mb-4">
        <Col xs={12} md={4} className="mb-3">
          <div className="stat-box">
            <span className="stat-number">{bookmarkedExercises.length}</span>
            Bookmarked exercises
          </div>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <div className="stat-box">
            <span className="stat-number">{progressEntries.length}</span>
            Total progress entries
          </div>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <div className="stat-box">
            <span className="stat-number">{bookmarkedExercises.length === 0 ? 0 : "✓"}</span>
            Progress summary below
          </div>
        </Col>
      </Row>

      {bookmarkedExercises.length === 0 ? (
        <div className="empty-state">
          <p>You have no bookmarked exercises yet.</p>
          <Button as={Link} to="/exercises">
            Find Exercises
          </Button>
        </div>
      ) : (
        <>
          <section className="page-section filter-panel" aria-labelledby="bookmark-progress-heading">
            <h2 id="bookmark-progress-heading" className="h3">
              Progress for Bookmarked Exercises
            </h2>

            <p className="section-intro">
              This table gives quick feedback on your saved exercises before you open the full cards.
            </p>

            <div className="table-wrapper">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Best Max Reps</th>
                    <th>Latest Entry</th>
                  </tr>
                </thead>
                <tbody>
                  {bookmarkedExercises.map((exercise) => (
                    <tr key={exercise.id}>
                      <td>{exercise.name}</td>
                      <td>{getBestReps(exercise.id)}</td>
                      <td>{getLatestDate(exercise.id)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>

          <section className="page-section" aria-labelledby="bookmarked-list-heading">
            <h2 id="bookmarked-list-heading" className="h3">
              Saved Exercise Cards
            </h2>

            <Row className="mt-3">
              {bookmarkedExercises.map((exercise) => (
                <Col key={exercise.id} xs={12} md={6} lg={4} className="mb-4">
                  <ExerciseCard
                    id={exercise.id}
                    name={exercise.name}
                    muscleGroup={exercise.muscleGroup}
                    difficulty={exercise.difficulty}
                    equipment={exercise.equipment}
                    description={exercise.description}
                    details={exercise.details}
                    tips={exercise.tips}
                    image={exercise.image}
                    imageName={exercise.imageName}
                    imageAlt={exercise.imageAlt}
                    isBookmarked={true}
                    onToggleBookmark={handleToggleBookmark}
                    onProgressSaved={handleProgressSaved}
                    currentUser={props.currentUser}
                  />
                </Col>
              ))}
            </Row>
          </section>
        </>
      )}
    </Container>
  );
}
