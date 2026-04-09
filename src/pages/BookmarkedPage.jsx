import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exercises from "../data/exercises";

export default function BookmarkedPage() {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedExerciseIds")) || [];
    setBookmarkedIds(savedBookmarks);
  }, []);

  function handleToggleBookmark(id) {
    const newBookmarkedIds = bookmarkedIds.filter((bookmarkedId) => bookmarkedId !== id);
    setBookmarkedIds(newBookmarkedIds);
    localStorage.setItem("bookmarkedExerciseIds", JSON.stringify(newBookmarkedIds));
  }

  const bookmarkedExercises = exercises.filter((exercise) =>
    bookmarkedIds.includes(exercise.id)
  );

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
                imageReferences={exercise.imageReferences}
                videoReferences={exercise.videoReferences}
                isBookmarked={true}
                onToggleBookmark={handleToggleBookmark}
                />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}