import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoCaretBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Header from "../components/Header";
import { ProblemContext } from "../context/ProblemContext";
import { Problem } from "../db/collections/Problem";
import { ProblemDifficulty } from "../db/collections/Problem/Problem";
import { Tag } from "../db/collections/Tag";

interface AddProblemProps {}

export default function AddProblem({}: AddProblemProps) {
  const navigate = useNavigate();
  const context = useContext(ProblemContext);
  const [contestNo, setContestNo] = useState(0);
  const [problemNo, setProblemNo] = useState(0);
  const [name, setName] = useState("");
  const [statement, setStatement] = useState("");
  const [difficulty, setDifficulty] = useState<ProblemDifficulty>(1);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
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
            Add Problem
          </>
        }
      />
      <Form>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="contest-no">Contest No.</Form.Label>
          <Form.Control
            id="contest-no"
            type="number"
            min={1}
            onChange={(e) => setContestNo(() => parseInt(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="problem-no">Problem No.</Form.Label>
          <Form.Control
            id="problem-no"
            type="number"
            min={1}
            onChange={(e) => setProblemNo(() => parseInt(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="problem-name">Name</Form.Label>
          <Form.Control
            id="problem-name"
            type="text"
            onChange={(e) => setName(() => e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="statement">Statement</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={10}
            id="statement"
            type="text"
            onChange={(e) => setStatement(() => e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="problem-difficulty">Difficulty</Form.Label>
          <Form.Control
            id="problem-difficulty"
            type="number"
            min={1}
            max={10}
            onChange={(e) =>
              setDifficulty(() => parseInt(e.target.value) as ProblemDifficulty)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Select
            isMulti
            options={context.tags.map((tag) => ({
              value: tag.name,
              label: tag.name,
            }))}
            onChange={(curSelectedTags) =>
              setSelectedTags(() =>
                curSelectedTags.map(
                  ({ value }) => context.tags.find((tag) => tag.name === value)!
                )
              )
            }
          />
        </Form.Group>
        <Button
          className="w-100 btn-success"
          onClick={() =>
            Problem.add(
              problemNo,
              name,
              difficulty,
              statement,
              selectedTags,
              contestNo
            ).then(() => navigate("/"))
          }
        >
          Add
        </Button>
      </Form>
    </>
  );
}
