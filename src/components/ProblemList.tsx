import { useContext } from "react";
import { Table } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ProblemContext } from "../context/ProblemContext";
import ProblemListRow from "./ProblemListRow";

export default function ProblemList() {
  const context = useContext(ProblemContext);
  const navigate = useNavigate();

  const headers: string[] = [
    "Contest No.",
    "Problem No.",
    "Problem Name",
    "Difficulty",
    "Tags",
  ];

  return (
    <Table hover responsive>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="fw-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {context.problems.map((problem) => (
          <ProblemListRow key={problem.name} problem={problem} />
        ))}
        <tr>
          <td
            colSpan={5}
            className="text-center user-select-none"
            role={"button"}
            onClick={() => navigate("/problem/add")}
          >
            <IoAdd color="gray" />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
