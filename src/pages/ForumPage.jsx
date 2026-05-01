import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { addForumPost, getForumPosts, updateForumPost } from "../data/database";

export default function ForumPage(props) {
  const [posts, setPosts] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postImageAlt, setPostImageAlt] = useState("");

  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const savedPosts = await getForumPosts();
    setPosts(savedPosts);
  }

  function makeSmallId() {
    return Date.now().toString() + "-" + Math.floor(Math.random() * 100000).toString();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPostImage("");
      setPostImageAlt("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      event.target.value = "";
      setPostImage("");
      setPostImageAlt("");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (readerEvent) {
      setPostImage(readerEvent.target.result);
    };

    reader.readAsDataURL(file);
  }

  async function handleAddPost(event) {
    event.preventDefault();

    if (!props.currentUser) {
      alert("Please log in to post.");
      return;
    }

    if (postTitle.trim() === "" || postBody.trim() === "") {
      alert("Please enter a title and message.");
      return;
    }

    if (postImage && postImageAlt.trim() === "") {
      alert("Please enter alt text for the uploaded image.");
      return;
    }

    await addForumPost({
      title: postTitle,
      body: postBody,
      image: postImage,
      imageAlt: postImageAlt,
      author: props.currentUser.name,
      authorEmail: props.currentUser.email,
      date: new Date().toLocaleString()
    });

    setPostTitle("");
    setPostBody("");
    setPostImage("");
    setPostImageAlt("");
    event.target.reset();
    loadPosts();
  }

  function handleCommentChange(postId, text) {
    setCommentTexts({
      ...commentTexts,
      [postId]: text
    });
  }

  async function handleAddComment(postId) {
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
          id: makeSmallId(),
          author: props.currentUser.name,
          authorEmail: props.currentUser.email,
          text: commentText,
          date: new Date().toLocaleString(),
          likes: 0,
          dislikes: 0
        };

        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }

      return post;
    });

    const changedPost = newPosts.find((post) => post.id === postId);
    await updateForumPost(changedPost);
    setPosts(newPosts);

    setCommentTexts({
      ...commentTexts,
      [postId]: ""
    });
  }

  async function handlePostReaction(postId, reactionType) {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        if (reactionType === "like") {
          return {
            ...post,
            likes: (post.likes || 0) + 1
          };
        }

        return {
          ...post,
          dislikes: (post.dislikes || 0) + 1
        };
      }

      return post;
    });

    const changedPost = newPosts.find((post) => post.id === postId);
    await updateForumPost(changedPost);
    setPosts(newPosts);
  }

  async function handleCommentReaction(postId, commentId, reactionType) {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComments = (post.comments || []).map((comment) => {
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

        return {
          ...post,
          comments: newComments
        };
      }

      return post;
    });

    const changedPost = newPosts.find((post) => post.id === postId);
    await updateForumPost(changedPost);
    setPosts(newPosts);
  }

  return (
    <Container className="mt-4">
      <div className="page-header">
        <h1>Forum</h1>
        <p>
          Anyone can view posts, but only logged in users can create posts or comments.
        </p>
      </div>

      {props.currentUser ? (
        <Card className="mb-4 content-card">
          <Card.Body>
            <Card.Title as="h2" className="h4">
              Create a Forum Post
            </Card.Title>

            <p className="subtle-text">
              Add a title, message, and optional image. Image alt text is required when an image is uploaded.
            </p>

            <Form onSubmit={handleAddPost}>
              <Form.Group className="mb-3" controlId="forum-post-title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={postTitle}
                  onChange={(event) => setPostTitle(event.target.value)}
                  placeholder="Enter a post title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="forum-post-message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={postBody}
                  onChange={(event) => setPostBody(event.target.value)}
                  placeholder="Ask a question or share information..."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="forum-post-image">
                <Form.Label>Upload an image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Group>

              {postImage && (
                <>
                  <Form.Group className="mb-3" controlId="forum-post-image-alt">
                    <Form.Label>Image alt text</Form.Label>
                    <Form.Control
                      type="text"
                      value={postImageAlt}
                      onChange={(event) => setPostImageAlt(event.target.value)}
                      placeholder="Describe the image for accessibility"
                    />
                  </Form.Group>

                  <img
                    src={postImage}
                    alt={postImageAlt || "Selected forum image preview"}
                    className="forum-img mb-3"
                  />
                </>
              )}

              <Button type="submit" variant="success">
                Post
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="secondary">Log in to create posts or comments.</Alert>
      )}

      <section className="page-section" aria-labelledby="forum-posts-heading">
        <h2 id="forum-posts-heading" className="h3">
          Forum Posts
        </h2>

        <p className="result-count">{posts.length} post(s)</p>

        {posts.length === 0 ? (
          <div className="empty-state mt-3">
            <p className="mb-0">No forum posts yet.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="mb-3 forum-post-card">
              <Card.Body>
                <Card.Title as="h3" className="h5">
                  {post.title}
                </Card.Title>

                <Card.Text>{post.body}</Card.Text>

                {post.image && (
                  <img
                    src={post.image}
                    alt={post.imageAlt || "Forum post image"}
                    className="forum-img mb-3"
                  />
                )}

                <p>
                  <small>
                    Posted by {post.author} on {post.date}
                  </small>
                </p>

                <Button
                  size="sm"
                  variant="outline-success"
                  className="reaction-button"
                  onClick={() => handlePostReaction(post.id, "like")}
                >
                  Like ({post.likes || 0})
                </Button>

                <Button
                  size="sm"
                  variant="outline-danger"
                  className="reaction-button"
                  onClick={() => handlePostReaction(post.id, "dislike")}
                >
                  Dislike ({post.dislikes || 0})
                </Button>

                <hr />

                <h4 className="small-heading">Comments</h4>

                {(post.comments || []).length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  post.comments.map((comment) => (
                    <Card key={comment.id} className="mb-2 comment-card">
                      <Card.Body>
                        <p className="mb-1">{comment.text}</p>
                        <small>
                          Commented by {comment.author} on {comment.date}
                        </small>
                        <div>
                          <Button
                            size="sm"
                            variant="outline-success"
                            className="reaction-button"
                            onClick={() => handleCommentReaction(post.id, comment.id, "like")}
                          >
                            Like ({comment.likes || 0})
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="reaction-button"
                            onClick={() => handleCommentReaction(post.id, comment.id, "dislike")}
                          >
                            Dislike ({comment.dislikes || 0})
                          </Button>
                        </div>
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
                    <Form.Group className="mb-2" controlId={"comment-for-post-" + post.id}>
                      <Form.Label>Write a comment</Form.Label>
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
      </section>
    </Container>
  );
}
