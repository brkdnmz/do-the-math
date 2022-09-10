import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoCaretBackOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeMathJaxSvg from "rehype-mathjax";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import Header from "../components/Header";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";

export default function ProblemPage() {
  const navigate = useNavigate();
  const params = useParams(); // contestNo, problemNo
  const contestNo = parseInt(params.contestNo!);
  const problemName = params.problemName!;
  const [contest, setContest] = useState<Contest>();
  const [problem, setProblem] = useState<Problem>();
  const [editedStatement, setEditedStatement] = useState<string>("");

  useEffect(() => {
    Contest.getByNo(contestNo).then((contest) => setContest(() => contest));
    Problem.getByName(problemName).then((problem) => {
      setProblem(() => problem);
      setEditedStatement(() => problem.statement);
    });
  }, []);

  const deleteProblem = () => {
    Problem.removeByName(problemName);
  };

  const loading = !(problem && contest);

  if (loading) return <>Loading...</>;

  return (
    <>
      <Header
        pageHeader={
          <>
            <IoCaretBackOutline
              color="#8950fc"
              size={24}
              role="button"
              title="Go back to the problem list"
              onClick={() => navigate("/")}
            />
            {problem.name}
            <FaTrash
              role={"button"}
              color="red"
              size={24}
              onClick={() => deleteProblem()}
            />
          </>
        }
      />
      <Row className="justify-content-center gy-2 row-cols-1">
        <Col>
          <textarea
            className="form-control"
            rows={20}
            value={editedStatement}
            onChange={(e) => setEditedStatement(() => e.target.value)}
          ></textarea>
        </Col>

        <Col className="col-auto">
          <Button>Edit</Button>
        </Col>
        <Col>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeMathJaxSvg]}
            remarkPlugins={[remarkMath]}
          >
            {editedStatement}
          </ReactMarkdown>
        </Col>
      </Row>
      {/* <pre role="button" onClick={() => navigator.clipboard.writeText(newData)}>
        {newData}
      </pre> */}
    </>
  );
}
