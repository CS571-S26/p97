import { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

export default function ExerciseCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    let savedComments = {};

    if (localStorage.getItem("exerciseComments")) {
      savedComments = JSON.parse(localStorage.getItem("exerciseComments"));
    }

    const exerciseComments = savedComments[props.id] || [];
    setComments(exerciseComments);
  }, [props.id]);

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleAddComment(event) {
    event.preventDefault();

    if (!props.currentUser) {
      alert("Please log in to comment.");
      return;
    }

    if (commentText.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    let savedComments = {};

    if (localStorage.getItem("exerciseComments")) {
      savedComments = JSON.parse(localStorage.getItem("exerciseComments"));
    }

    const newComment = {
      author: props.currentUser.name,
      text: commentText,
      date: new Date().toLocaleString()
    };

    const oldComments = savedComments[props.id] || [];
    const newComments = [...oldComments, newComment];

    savedComments[props.id] = newComments;

    localStorage.setItem("exerciseComments", JSON.stringify(savedComments));
    setComments(newComments);
    setCommentText("");
  }

  return (
    <>
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>

          <Card.Text>
            <strong>Muscle Group:</strong> {props.muscleGroup}
          </Card.Text>

          <Card.Text>
            <strong>Difficulty:</strong> {props.difficulty}
          </Card.Text>

          <Card.Text>
            <strong>Equipment:</strong> {props.equipment}
          </Card.Text>

          <Card.Text>{props.description}</Card.Text>

          {props.image && (
            <img
              src={props.image}
              alt={props.name}
              className="img-fluid mb-3"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
          )}

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
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Muscle Group:</strong> {props.muscleGroup}
          </p>

          <p>
            <strong>Difficulty:</strong> {props.difficulty}
          </p>

          <p>
            <strong>Equipment:</strong> {props.equipment}
          </p>

          <p>
            <strong>Description:</strong> {props.description}
          </p>

          <p>
            <strong>Details:</strong> {props.details}
          </p>

          <h5>Tips</h5>

          {(props.tips || []).length === 0 ? (
            <p>No tips added yet.</p>
          ) : (
            <ul>
              {props.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}

          {props.image && (
            <img
              src={props.image}
              alt={props.name}
              className="img-fluid mb-3"
            />
          )}

          <hr />

          <h5>Comments</h5>

          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <Card key={index} className="mb-2">
                <Card.Body>
                  <p className="mb-1">{comment.text}</p>
                  <small>
                    Posted by {comment.author} on {comment.date}
                  </small>
                </Card.Body>
              </Card>
            ))
          )}

          {props.currentUser ? (
            <Form onSubmit={handleAddComment} className="mt-3">
              <Form.Group className="mb-2">
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
            <p className="text-muted mt-3">
              Log in to post comments on this exercise.
            </p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}