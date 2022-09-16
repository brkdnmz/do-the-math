import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import Header from "../components/Header";
import AdminOnly from "../components/util/AdminOnly";
import AlertButton from "../components/util/AlertButton";
import EditAndPreviewButton from "../components/util/EditAndPreviewButton";
import { AdminContext } from "../context/AdminContext";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";

export default function ProblemPage() {
  const { isAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const params = useParams(); // contestNo, problemNo
  const contestNo = parseInt(params.contestNo!);
  const problemName = params.problemName!;
  const [contest, setContest] = useState<Contest>();
  const [problem, setProblem] = useState<Problem>();
  const [editedStatement, setEditedStatement] = useState<string>("");
  const [updateText, setUpdateText] = useState("");
  const [deleteText, setDeleteText] = useState("");
  const [showPreview, setShowPreview] = useState(!isAdmin);

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
  }, [contestNo, problemName]);

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

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  const loading = !(problem && contest);

  return (
    <>
      <Header
        pageHeader={
          <>
            {loading ? <Skeleton width={"200px"} /> : problem.name}
            <AdminOnly>
              <AlertButton
                className="py-0"
                variant="link"
                onClick={deleteProblem}
                alertText={deleteText}
                disabled={loading}
              >
                <FaTrash
                  color="red"
                  size={24}
                />
              </AlertButton>
            </AdminOnly>
          </>
        }
      />

      <Row className="justify-content-center gy-2 gx-0 row-cols-1">
        <Col className="col-12 position-relative">
          {loading ? (
            <Skeleton height={510} />
          ) : (
            <>
              <AdminOnly>
                <div className="d-flex">
                  <textarea
                    style={{
                      display: showPreview ? "none" : "initial",
                    }}
                    className="p-3 form-control"
                    rows={20}
                    value={editedStatement}
                    onChange={(e) => setEditedStatement(() => e.target.value)}
                  />
                </div>
              </AdminOnly>
              {showPreview && (
                <Card>
                  <Card.Body
                    style={{
                      boxSizing: "content-box",
                      height: "480px",
                      overflowY: "auto",
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
              <AdminOnly>
                <EditAndPreviewButton
                  whatToShow={showPreview ? "preview" : "edit"}
                  onClick={() => togglePreview()}
                />
              </AdminOnly>
            </>
          )}
        </Col>

        <Col className="col-auto">
          <AdminOnly>
            {loading ? (
              <Skeleton
                width={59}
                height={38}
              />
            ) : (
              <AlertButton
                alertText={updateText}
                onClick={updateStatement}
              >
                Save
              </AlertButton>
            )}
          </AdminOnly>
        </Col>
      </Row>
    </>
  );
}
