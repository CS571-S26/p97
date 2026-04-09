import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

export default function ExerciseCard(props) {
  const [showModal, setShowModal] = useState(false);

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
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

          <Button variant="primary" className="me-2" onClick={handleOpen}>
            More Information
          </Button>

          <Button onClick={() => props.onToggleBookmark(props.id)}>
            {props.isBookmarked ? "Remove Bookmark" : "Bookmark"}
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="xl" centered>
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
            <div className="mt-4">
                <h4>Image References</h4>
                {props.imageReferences.length === 0 ? (
                <p>No image references added yet.</p>
                ) : (
                props.imageReferences.map((imageRef, index) => (
                    <p key={index}>{imageRef}</p>
                ))
                )}
            </div>
            <div className="mt-4">
                <h4>Video References</h4>
                {props.videoReferences.length === 0 ? (
                <p>No video references added yet.</p>
                ) : (
                props.videoReferences.map((videoRef, index) => (
                    <p key={index}>{videoRef}</p>
                ))
                )}
            </div>
            </Modal.Body>
        
      </Modal>
    </>
  );
}