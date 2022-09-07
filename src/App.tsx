import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProblemProvider } from "./context/ProblemContext";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemEditor from "./pages/ProblemEditor";

function App() {
  return (
    <ProblemProvider>
      <Container>
        <Row className="justify-content-center my-3">
          <Col className="col-lg-10 col-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="contest/:contestNo/problem/:problemNo"
                element={<ProblemEditor />}
              />
              <Route path="/problem/add" element={<AddProblem />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </ProblemProvider>
  );
}

export default App;
