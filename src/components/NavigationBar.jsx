import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Calisthenics Hub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <NavDropdown title="Exercises" id="exercise-nav-dropdown">
              <NavDropdown.Item as={Link} to="/exercises">
                All Exercises
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/bookmarked">
                Bookmarked Exercises
              </NavDropdown.Item>

              {props.currentUser && (
                <NavDropdown.Item as={Link} to="/progress">
                  Progress Tracker
                </NavDropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link as={Link} to="/forum">
              Forum
            </Nav.Link>

            <Nav.Link as={Link} to="/resources">
              Resources
            </Nav.Link>
          </Nav>

          <Nav>
            {props.currentUser ? (
              <>
                <Navbar.Text className="text-light me-3">
                  Hi, {props.currentUser.name}
                </Navbar.Text>

                <Button variant="outline-light" size="sm" onClick={props.onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}