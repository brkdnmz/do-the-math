import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from "react-markdown";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import Header from "../components/Header";
import AlertButton from "../components/util/AlertButton";
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
  const [updateText, setUpdateText] = useState("");
  const [deleteText, setDeleteText] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    Contest.getByNo(contestNo)
      .then((contest) => setContest(() => contest))
      .catch((e) => console.log(e));

    Problem.getByName(problemName)
      .then((problem) => {
        setProblem(() => problem);
        setEditedStatement(() => problem.statement);
      })
      .catch((e) => console.log(e));
  }, []);

  const deleteProblem = async (): Promise<void> => {
    return Problem.removeByName(problemName)
      .then(() => {
        setDeleteText(
          "Successfully deleted! Redirecting to the problem list..."
        );
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((e) => {
        console.log(e);
        setDeleteText("An error occurred deleting the problem!");
      });
  };

  const updateStatement = async (): Promise<void> => {
    return problem
      ?.updateStatement(editedStatement)
      .then(() => {
        setUpdateText("Problem statement successfully saved!");
      })
      .catch((e) => {
        console.log(e);
        setUpdateText("An error occurred updating the problem!");
      });
  };

  const loading = !(problem && contest);

  return (
    <>
      <Header
        pageHeader={
          <>
            <NavLink to="/" title="Go back to the problem list">
              <Button variant="link" className="w-auto py-0">
                <IoReturnUpBackOutline color="#8950fc" size={30} />
              </Button>
            </NavLink>
            {loading ? <Skeleton width={"200px"} /> : problem.name}
            <AlertButton
              className="py-0"
              variant="link"
              onClick={deleteProblem}
              alertText={deleteText}
              disabled={loading}
            >
              <FaTrash color="red" size={24} />
            </AlertButton>
          </>
        }
      />

      <Row className="justify-content-center gy-2 gx-0 row-cols-1">
        <Col className="position-relative">
          {loading ? (
            <Skeleton height={514} />
          ) : (
            <>
              <textarea
                style={{ display: showPreview ? "none" : "initial" }}
                className="form-control p-3"
                rows={20}
                value={editedStatement}
                onChange={(e) => setEditedStatement(() => e.target.value)}
              />
              {showPreview && (
                <Card>
                  <Card.Body
                    style={{
                      boxSizing: "content-box",
                      height: "480px",
                      overflowY: "scroll",
                    }}
                  >
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeKatex]}
                      remarkPlugins={[remarkMath]}
                    >
                      {editedStatement}
                    </ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
              <Button
                variant="link"
                className="position-absolute top-0 end-0"
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "100%";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "50%";
                }}
                onClick={() => setShowPreview((prev) => !prev)}
              >
                {!showPreview ? <FaEye size={30} /> : <FaPen size={30} />}
              </Button>
            </>
          )}
        </Col>

        <Col className="col-auto">
          {loading ? (
            <Skeleton width={59} height={38} />
          ) : (
            <AlertButton alertText={updateText} onClick={updateStatement}>
              Save
            </AlertButton>
          )}
        </Col>
      </Row>
    </>
  );
}
