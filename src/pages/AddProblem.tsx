import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { IoCaretBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Header from "../components/Header";
import { ProblemContext } from "../context/ProblemContext";

interface AddProblemProps {}

export default function AddProblem({}: AddProblemProps) {
  const { tags } = useContext(ProblemContext);
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
            Add Problem
          </>
        }
      />
      <Form>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="contest-no">Contest No.</Form.Label>
          <Form.Control id="contest-no" type="number" min={1} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="problem-no">Problem No.</Form.Label>
          <Form.Control id="problem-no" type="number" min={1} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="problem-name">Name</Form.Label>
          <Form.Control id="problem-name" type="text" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="problem-difficulty">Difficulty</Form.Label>
          <Form.Control
            id="problem-difficulty"
            type="number"
            min={1}
            max={10}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Select
            isMulti
            options={tags.map((tag) => ({ value: tag.name, label: tag.name }))}
          />
        </Form.Group>
        <Button className="w-100 btn-success">Add</Button>
      </Form>
    </>
  );
}
