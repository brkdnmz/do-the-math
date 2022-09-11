import "katex/dist/katex.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router-dom";
import { ProblemProvider } from "./context/ProblemContext";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";

function App() {
  return (
    <ProblemProvider>
      <Container className="min-vh-100">
        <Row className="justify-content-center">
          <Col className="col-lg-10 col-12 my-3">
            <SkeletonTheme baseColor="#f2ebff" highlightColor="#f9f6ff">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="contest/:contestNo/problem/:problemName"
                  element={<ProblemPage />}
                />
                <Route path="/problem/add" element={<AddProblem />} />
              </Routes>
            </SkeletonTheme>
          </Col>
        </Row>
      </Container>
    </ProblemProvider>
  );
}

export default App;
