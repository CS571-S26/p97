import { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Table } from "react-bootstrap";
import { getExerciseImage } from "../data/imagePaths";
import {
  addExerciseComment,
  updateExerciseComment,
  getExerciseComments,
  addProgressEntry,
  getProgressForExercise
} from "../data/database";

export default function ExerciseCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [maxReps, setMaxReps] = useState("");
  const [progressEntries, setProgressEntries] = useState([]);

  useEffect(() => {
    loadComments();
    loadProgress();
  }, [props.id, props.currentUser]);

  async function loadComments() {
    const savedComments = await getExerciseComments(props.id);
    setComments(savedComments);
  }

  async function loadProgress() {
    if (!props.currentUser) {
      setProgressEntries([]);
      return;
    }

    const savedProgress = await getProgressForExercise(props.currentUser.email, props.id);
    setProgressEntries(savedProgress);
  }

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  async function handleAddComment(event) {
    event.preventDefault();

    if (!props.currentUser) {
      alert("Please log in to comment.");
      return;
    }

    if (commentText.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    await addExerciseComment({
      exerciseId: props.id,
      author: props.currentUser.name,
      authorEmail: props.currentUser.email,
      text: commentText,
      date: new Date().toLocaleString()
    });

    setCommentText("");
    loadComments();
  }

  async function handleCommentReaction(commentId, reactionType) {
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        if (reactionType === "like") {
          return {
            ...comment,
            likes: (comment.likes || 0) + 1
          };
        }

        return {
          ...comment,
          dislikes: (comment.dislikes || 0) + 1
        };
      }

      return comment;
    });

    const changedComment = newComments.find((comment) => comment.id === commentId);
    await updateExerciseComment(changedComment);
    setComments(newComments);
  }

  async function handleAddProgress(event) {
    event.preventDefault();

    if (!props.currentUser) {
      alert("Please log in to track progress.");
      return;
    }

    if (maxReps.trim() === "" || Number(maxReps) <= 0) {
      alert("Please enter a valid max rep count.");
      return;
    }

    await addProgressEntry({
      userEmail: props.currentUser.email,
      exerciseId: props.id,
      exerciseName: props.name,
      maxReps: Number(maxReps),
      date: new Date().toLocaleDateString()
    });

    setMaxReps("");
    loadProgress();

    if (props.onProgressSaved) {
      props.onProgressSaved();
    }
  }

  let exerciseImage = props.image || getExerciseImage(props.imageName);

  let bestMaxReps = null;

  if (progressEntries.length > 0) {
    bestMaxReps = Math.max(...progressEntries.map((entry) => entry.maxReps));
  }

  return (
    <>
      <Card className="h-100 exercise-card">
        <Card.Body className="d-flex flex-column">
          <Card.Title as="h3" className="h5">
            {props.name}
          </Card.Title>

          <div className="exercise-meta" aria-label="Exercise details">
            <span className="meta-pill">{props.muscleGroup}</span>
            <span className="meta-pill">{props.difficulty}</span>
            <span className="meta-pill">{props.equipment}</span>
          </div>

          <Card.Text className="subtle-text">{props.description}</Card.Text>

          {props.currentUser && bestMaxReps !== null && (
            <Card.Text>
              <strong>Your Best Max Reps:</strong> {bestMaxReps}
            </Card.Text>
          )}

          {exerciseImage ? (
            <img
              src={exerciseImage}
              alt={props.imageAlt || props.name + " exercise image"}
              className="card-img-fixed mb-3"
            />
          ) : (
            <div className="image-placeholder" aria-label={props.name + " image placeholder"}>
              Image will be added later.
            </div>
          )}

          <div className="mt-auto">
            <Button variant="primary" className="me-2 mb-2" onClick={handleOpen}>
              More Information
            </Button>

            {props.currentUser ? (
              <Button
                variant={props.isBookmarked ? "warning" : "outline-primary"}
                className="mb-2"
                onClick={() => props.onToggleBookmark(props.id)}
              >
                {props.isBookmarked ? "Remove Bookmark" : "Bookmark"}
              </Button>
            ) : (
              <Button variant="secondary" className="mb-2" disabled>
                Login to Bookmark
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h4">
            {props.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="exercise-meta" aria-label="Exercise details">
            <span className="meta-pill">{props.muscleGroup}</span>
            <span className="meta-pill">{props.difficulty}</span>
            <span className="meta-pill">{props.equipment}</span>
          </div>

          <p>
            <strong>Description:</strong> {props.description}
          </p>

          <p>
            <strong>Details:</strong> {props.details}
          </p>

          <h3 className="small-heading">Tips</h3>

          {(props.tips || []).length === 0 ? (
            <p>No tips added yet.</p>
          ) : (
            <ul>
              {props.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}

          {exerciseImage ? (
            <img
              src={exerciseImage}
              alt={props.imageAlt || props.name + " exercise image"}
              className="img-fluid mb-3"
            />
          ) : (
            <div className="image-placeholder" aria-label={props.name + " image placeholder"}>
              Image will be added later.
            </div>
          )}

          <hr />

          <h3 className="small-heading">Your Progress for This Exercise</h3>

          {props.currentUser ? (
            <>
              <Form onSubmit={handleAddProgress} className="mb-3">
                <Form.Group className="mb-2" controlId={"progress-reps-" + props.id}>
                  <Form.Label>Max reps</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={maxReps}
                    onChange={(event) => setMaxReps(event.target.value)}
                    placeholder="Example: 20"
                  />
                </Form.Group>

                <Button type="submit" variant="success">
                  Save Progress
                </Button>
              </Form>

              {progressEntries.length === 0 ? (
                <p>No progress saved for this exercise yet.</p>
              ) : (
                <div className="table-wrapper">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Max Reps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progressEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.date}</td>
                          <td>{entry.maxReps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </>
          ) : (
            <p>Log in to track progress for this exercise.</p>
          )}

          <hr />

          <h3 className="small-heading">Comments</h3>

          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id} className="mb-2 comment-card">
                <Card.Body>
                  <p className="mb-1">{comment.text}</p>
                  <small>
                    Posted by {comment.author} on {comment.date}
                  </small>
                  <div>
                    <Button
                      size="sm"
                      variant="outline-success"
                      className="reaction-button"
                      onClick={() => handleCommentReaction(comment.id, "like")}
                    >
                      Like ({comment.likes || 0})
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="reaction-button"
                      onClick={() => handleCommentReaction(comment.id, "dislike")}
                    >
                      Dislike ({comment.dislikes || 0})
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}

          {props.currentUser ? (
            <Form onSubmit={handleAddComment} className="mt-3">
              <Form.Group className="mb-2" controlId={"exercise-comment-" + props.id}>
                <Form.Label>Add a comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder="Post a tip, correction, or useful note..."
                />
              </Form.Group>

              <Button type="submit" variant="success">
                Post Comment
              </Button>
            </Form>
          ) : (
            <p className="mt-3">Log in to post comments on this exercise.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
