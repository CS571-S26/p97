import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exercises from "../data/exercises";

export default function BookmarkedPage(props) {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    if (props.currentUser) {
      const bookmarkKey = "bookmarkedExerciseIds_" + props.currentUser.email;

      let savedBookmarks = [];

      if (localStorage.getItem(bookmarkKey)) {
        savedBookmarks = JSON.parse(localStorage.getItem(bookmarkKey));
      }

      setBookmarkedIds(savedBookmarks);
    } else {
      setBookmarkedIds([]);
    }
  }, [props.currentUser]);

  function handleToggleBookmark(id) {
    if (!props.currentUser) {
      return;
    }

    const newBookmarkedIds = bookmarkedIds.filter((bookmarkedId) => bookmarkedId !== id);
    const bookmarkKey = "bookmarkedExerciseIds_" + props.currentUser.email;

    setBookmarkedIds(newBookmarkedIds);
    localStorage.setItem(bookmarkKey, JSON.stringify(newBookmarkedIds));
  }

  const bookmarkedExercises = exercises.filter((exercise) =>
    bookmarkedIds.includes(exercise.id)
  );

  if (!props.currentUser) {
    return (
      <Container className="mt-4">
        <h1>Bookmarked Exercises</h1>
        <p>Please log in to view your bookmarked exercises.</p>
        <Button as={Link} to="/login">
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Bookmarked Exercises</h1>

      {bookmarkedExercises.length === 0 ? (
        <p>You have no bookmarked exercises yet.</p>
      ) : (
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
                isBookmarked={true}
                onToggleBookmark={handleToggleBookmark}
                currentUser={props.currentUser}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}