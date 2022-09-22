import { useContext } from "react";
import { Button } from "react-bootstrap";
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
    <div className="overflow-auto">
      <table className="relative z-10 w-full font-semibold border-separate table-auto border-spacing-0 drop-shadow-lg">
        <thead>
          {loading ? (
            <tr>
              <th colSpan={5}>
                <Skeleton />
              </th>
            </tr>
          ) : (
            <tr className="italic font-normal bg-purple-400 border-purple-500 whitespace-nowrap text-slate-50">
              {headers.map((header, i) => (
                <th
                  key={header}
                  className={
                    "p-2 border-y " +
                    (!i ? "rounded-tl-lg border-l " : "") +
                    (i + 1 == headers.length ? "rounded-tr border-r" : "")
                  }
                >
                  {header}
                </th>
              ))}
            </tr>
          )}
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
              .map((problem, i) => (
                <ProblemListRow
                  key={problem.name}
                  problem={problem}
                  last={i + 1 === context.problems.length}
                />
              ))
          )}
        </tbody>
      </table>
      <AdminOnly>
        <div className="grid grid-cols-3">
          <div className="relative z-0 flex col-span-1 col-start-2 duration-300 -translate-y-1/2 bg-blue-400 rounded-b-xl hover:translate-y-0">
            <NavLink
              to="/problem/add"
              className="w-full text-center"
              title="Add a new problem"
            >
              <Button variant="link">
                <IoAdd
                  color="white"
                  size={25}
                />
              </Button>
            </NavLink>
          </div>
        </div>
      </AdminOnly>
    </div>
  );
}
