import { useContext } from "react";
import { Table } from "react-bootstrap";
import { ProblemContext } from "../context/ProblemContext";
import ProblemListRow from "./ProblemListRow";

export default function ProblemList() {
  const { problems } = useContext(ProblemContext);

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
        {problems.map((problem, i) => (
          <ProblemListRow key={i} problem={problem} />
        ))}
      </tbody>
    </Table>
  );
}
