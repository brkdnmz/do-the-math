import { useContext } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { ProblemContext } from "../context/ProblemContext";
import ProblemListRow from "./ProblemListRow";
import AdminOnly from "./util/AdminOnly";

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
    <Card>
      <Card.Body>
        <Table hover responsive className="table-auto">
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
              context.problems
                .sort((problem1, problem2) => problem1.no - problem2.no)
                .map((problem) => (
                  <ProblemListRow key={problem.name} problem={problem} />
                ))
            )}
            <AdminOnly>
              <tr>
                <td
                  colSpan={5}
                  className="text-center user-select-none"
                  role={"button"}
                  title="Add a new problem"
                >
                  <NavLink to="/problem/add">
                    <div className="flex justify-center">
                      <Button variant="link">
                        <IoAdd color="gray" />
                      </Button>
                    </div>
                  </NavLink>
                </td>
              </tr>
            </AdminOnly>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
