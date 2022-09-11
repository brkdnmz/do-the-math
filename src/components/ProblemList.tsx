import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { ProblemContext } from "../context/ProblemContext";
import ProblemListRow from "./ProblemListRow";

export default function ProblemList() {
  const context = useContext(ProblemContext);

  const headers: string[] = [
    "Contest No.",
    "Problem No.",
    "Problem Name",
    "Difficulty",
    "Tags",
  ];

  const loading = context.problems.length === 0;

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
        {loading ? (
          <tr>
            <td colSpan={5}>
              <Skeleton />
            </td>
          </tr>
        ) : (
          context.problems.map((problem) => (
            <ProblemListRow key={problem.name} problem={problem} />
          ))
        )}
        <tr>
          <td
            colSpan={5}
            className="text-center user-select-none"
            role={"button"}
            title="Add a new problem"
          >
            <NavLink to="/problem/add">
              <Button variant="link" className="w-100 p-0">
                <IoAdd color="gray" />
              </Button>
            </NavLink>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
