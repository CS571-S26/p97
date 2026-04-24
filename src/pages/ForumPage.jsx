import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

export default function ForumPage(props) {
  const [posts, setPosts] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    let savedPosts = [];

    if (localStorage.getItem("forumPosts")) {
      savedPosts = JSON.parse(localStorage.getItem("forumPosts"));
    }

    setPosts(savedPosts);
  }, []);

  function savePosts(newPosts) {
    setPosts(newPosts);
    localStorage.setItem("forumPosts", JSON.stringify(newPosts));
  }

  function handleAddPost(event) {
    event.preventDefault();

    if (!props.currentUser) {
      alert("Please log in to post.");
      return;
    }

    if (postTitle.trim() === "" || postBody.trim() === "") {
      alert("Please enter a title and message.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: postTitle,
      body: postBody,
      author: props.currentUser.name,
      date: new Date().toLocaleString(),
      comments: []
    };

    const newPosts = [newPost, ...posts];

    savePosts(newPosts);
    setPostTitle("");
    setPostBody("");
  }

  function handleCommentChange(postId, text) {
    setCommentTexts({
      ...commentTexts,
      [postId]: text
    });
  }

  function handleAddComment(postId) {
    if (!props.currentUser) {
      alert("Please log in to comment.");
      return;
    }

    const commentText = commentTexts[postId] || "";

    if (commentText.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          author: props.currentUser.name,
          text: commentText,
          date: new Date().toLocaleString()
        };

        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }

      return post;
    });

    savePosts(newPosts);

    setCommentTexts({
      ...commentTexts,
      [postId]: ""
    });
  }

  return (
    <Container className="mt-4">
      <h1>Forum</h1>

      <p>
        Only logged in users can post or comment.
      </p>

      {props.currentUser ? (
        <Card className="mb-4">
          <Card.Body>
            <h4>Create a Forum Post</h4>

            <Form onSubmit={handleAddPost}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={postTitle}
                  onChange={(event) => setPostTitle(event.target.value)}
                  placeholder="Enter a post title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={postBody}
                  onChange={(event) => setPostBody(event.target.value)}
                  placeholder="Ask a question or share information..."
                />
              </Form.Group>

              <Button type="submit" variant="success">
                Post
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="secondary">
          Log in to create posts or comments.
        </Alert>
      )}

      <h4>Forum Posts</h4>

      {posts.length === 0 ? (
        <p>No forum posts yet.</p>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>

              <Card.Text>{post.body}</Card.Text>

              <small>
                Posted by {post.author} on {post.date}
              </small>

              <hr />

              <h6>Comments</h6>

              {(post.comments || []).length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                post.comments.map((comment, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <p className="mb-1">{comment.text}</p>
                      <small>
                        Commented by {comment.author} on {comment.date}
                      </small>
                    </Card.Body>
                  </Card>
                ))
              )}

              {props.currentUser && (
                <Form
                  className="mt-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleAddComment(post.id);
                  }}
                >
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Write a comment..."
                      value={commentTexts[post.id] || ""}
                      onChange={(event) =>
                        handleCommentChange(post.id, event.target.value)
                      }
                    />
                  </Form.Group>

                  <Button type="submit" size="sm" variant="primary">
                    Comment
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}