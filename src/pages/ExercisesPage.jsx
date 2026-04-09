import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exercises from "../data/exercises";

export default function ExercisesPage() {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedExerciseIds")) || [];
    setBookmarkedIds(savedBookmarks);
  }, []);

  function handleToggleBookmark(id) {
    let newBookmarkedIds;

    if (bookmarkedIds.includes(id)) {
      newBookmarkedIds = bookmarkedIds.filter((bookmarkedId) => bookmarkedId !== id);
    } else {
      newBookmarkedIds = [...bookmarkedIds, id];
    }

    setBookmarkedIds(newBookmarkedIds);
    localStorage.setItem("bookmarkedExerciseIds", JSON.stringify(newBookmarkedIds));
  }

  // 🔥 FILTER LOGIC
  const filteredExercises = exercises.filter((exercise) => {
    const matchesName = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" ||
      exercise.difficulty === difficultyFilter;

    return matchesName && matchesDifficulty;
  });

  return (
    <Container className="mt-4">
      <h1>All Exercises</h1>

      {/* 🔍 FILTER UI */}
      <Row className="mt-3 mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col md={6}>
          <Form.Select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
          </Form.Select>
        </Col>
      </Row>

      {/* 🧱 EXERCISE CARDS */}
      <Row>
        {filteredExercises.length === 0 ? (
          <p>No exercises match your filters.</p>
        ) : (
          filteredExercises.map((exercise) => (
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
                isBookmarked={bookmarkedIds.includes(exercise.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}