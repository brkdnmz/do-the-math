import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IoCaretBackOutline } from "react-icons/io5";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeMathJaxSvg from "rehype-mathjax";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import Header from "../components/Header";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";

export default function ProblemEditor() {
  const { contestNo, problemNo } = useParams();
  const [contest, setContest] = useState<Contest>();
  const [problem, setProblem] = useState<Problem>();
  const [input, setInput] = useState(problem?.statement ?? "");
  const navigate = useNavigate();

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
            {problem?.name}
          </>
        }
      />
      <Row className="justify-content-center gy-2 row-cols-1">
        <Col>
          <textarea
            className="form-control"
            value={input}
            onChange={(e) => setInput(() => e.target.value)}
            rows={10}
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
            {input}
          </ReactMarkdown>
        </Col>
      </Row>
      {/* <pre role="button" onClick={() => navigator.clipboard.writeText(newData)}>
        {newData}
      </pre> */}
    </>
  );
}
