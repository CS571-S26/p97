import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import PageHeader from "../components/PageHeader";
import exercises from "../data/exercises";
import { addBookmark, getBookmarks, removeBookmark } from "../data/database";

export default function ExercisesPage(props) {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");

  useEffect(() => {
    loadBookmarks();
  }, [props.currentUser]);

  async function loadBookmarks() {
    if (!props.currentUser) {
      setBookmarkedIds([]);
      return;
    }

    const savedBookmarks = await getBookmarks(props.currentUser.email);
    setBookmarkedIds(savedBookmarks);
  }

  async function handleToggleBookmark(id) {
    if (!props.currentUser) {
      alert("Please log in to bookmark exercises.");
      return;
    }

    if (bookmarkedIds.includes(id)) {
      await removeBookmark(props.currentUser.email, id);
    } else {
      await addBookmark(props.currentUser.email, id);
    }

    loadBookmarks();
  }

  const muscleGroups = [...new Set(exercises.map((exercise) => exercise.muscleGroup))];
  const difficulties = [...new Set(exercises.map((exercise) => exercise.difficulty))];
  const equipmentList = [...new Set(exercises.map((exercise) => exercise.equipment))];

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
      <PageHeader
        headingId="exercises-heading"
        title="All Exercises"
        description="Browse calisthenics movements by goal, difficulty, and equipment. More exercise cards will be added later as the library grows."
      />

      {!props.currentUser && (
        <p className="subtle-text">
          You can view exercises without an account. Log in to bookmark exercises, comment, and track progress.
        </p>
      )}

      <section className="page-section filter-panel" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="h3">
          Search and Filter
        </h2>

        <Row className="mt-3">
          <Col xs={12} md={3} className="mb-2">
            <Form.Group controlId="exercise-search">
              <Form.Label>Search exercises</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3} className="mb-2">
            <Form.Group controlId="muscle-group-filter">
              <Form.Label>Muscle group</Form.Label>
              <Form.Select
                value={muscleGroupFilter}
                onChange={(event) => setMuscleGroupFilter(event.target.value)}
              >
                <option value="All">All Muscle Groups</option>
                {muscleGroups.map((muscleGroup) => (
                  <option key={muscleGroup} value={muscleGroup}>
                    {muscleGroup}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={3} className="mb-2">
            <Form.Group controlId="difficulty-filter">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                value={difficultyFilter}
                onChange={(event) => setDifficultyFilter(event.target.value)}
              >
                <option value="All">All Difficulties</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={3} className="mb-2">
            <Form.Group controlId="equipment-filter">
              <Form.Label>Equipment</Form.Label>
              <Form.Select
                value={equipmentFilter}
                onChange={(event) => setEquipmentFilter(event.target.value)}
              >
                <option value="All">All Equipment</option>
                {equipmentList.map((equipment) => (
                  <option key={equipment} value={equipment}>
                    {equipment}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </section>

      <section className="page-section" aria-labelledby="exercise-results-heading">
        <h2 id="exercise-results-heading" className="h3">
          Exercise Results
        </h2>

        <p className="result-count">{filteredExercises.length} exercise(s) found</p>

        <Row className="mt-3">
          {filteredExercises.length === 0 ? (
            <Col xs={12}>
              <div className="empty-state">
                <p className="mb-0">No exercises match your filters.</p>
              </div>
            </Col>
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
                  imageName={exercise.imageName}
                  imageAlt={exercise.imageAlt}
                  isBookmarked={bookmarkedIds.includes(exercise.id)}
                  onToggleBookmark={handleToggleBookmark}
                  currentUser={props.currentUser}
                />
              </Col>
            ))
          )}
        </Row>
      </section>
    </Container>
  );
}
