import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exercises from "../data/exercises";

export default function ExercisesPage(props) {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");

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
      alert("Please log in to bookmark exercises.");
      return;
    }

    let newBookmarkedIds;

    if (bookmarkedIds.includes(id)) {
      newBookmarkedIds = bookmarkedIds.filter((bookmarkedId) => bookmarkedId !== id);
    } else {
      newBookmarkedIds = [...bookmarkedIds, id];
    }

    const bookmarkKey = "bookmarkedExerciseIds_" + props.currentUser.email;

    setBookmarkedIds(newBookmarkedIds);
    localStorage.setItem(bookmarkKey, JSON.stringify(newBookmarkedIds));
  }

  const filteredExercises = exercises.filter((exercise) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const matchesSearch =
      exercise.name.toLowerCase().includes(lowerSearchTerm) ||
      exercise.description.toLowerCase().includes(lowerSearchTerm) ||
      exercise.muscleGroup.toLowerCase().includes(lowerSearchTerm);

    const matchesMuscleGroup =
      muscleGroupFilter === "All" || exercise.muscleGroup === muscleGroupFilter;

    const matchesDifficulty =
      difficultyFilter === "All" || exercise.difficulty === difficultyFilter;

    const matchesEquipment =
      equipmentFilter === "All" || exercise.equipment === equipmentFilter;

    return matchesSearch && matchesMuscleGroup && matchesDifficulty && matchesEquipment;
  });

  return (
    <Container className="mt-4">
      <h1>All Exercises</h1>

      {!props.currentUser && (
        <p className="text-muted">
          You can view exercises without an account. Log in to bookmark exercises and comment.
        </p>
      )}

      <Row className="mt-3 mb-3">
        <Col xs={12} md={3} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Col>

        <Col xs={12} md={3} className="mb-2">
          <Form.Select
            value={muscleGroupFilter}
            onChange={(event) => setMuscleGroupFilter(event.target.value)}
          >
            <option value="All">All Muscle Groups</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Triceps">Triceps</option>
            <option value="Legs">Legs</option>
            <option value="Core">Core</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Full Body">Full Body</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={3} className="mb-2">
          <Form.Select
            value={difficultyFilter}
            onChange={(event) => setDifficultyFilter(event.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={3} className="mb-2">
          <Form.Select
            value={equipmentFilter}
            onChange={(event) => setEquipmentFilter(event.target.value)}
          >
            <option value="All">All Equipment</option>
            <option value="None">None</option>
            <option value="Pull-Up Bar">Pull-Up Bar</option>
            <option value="Dip Bars">Dip Bars</option>
            <option value="Parallettes">Parallettes</option>
          </Form.Select>
        </Col>
      </Row>

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
                details={exercise.details}
                tips={exercise.tips}
                image={exercise.image}
                isBookmarked={bookmarkedIds.includes(exercise.id)}
                onToggleBookmark={handleToggleBookmark}
                currentUser={props.currentUser}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}