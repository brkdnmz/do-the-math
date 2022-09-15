import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";
import { Tag } from "../db/collections/Tag";

interface ProblemListRowProps {
  problem: Problem;
  last?: boolean;
}

export default function ProblemListRow({ problem, last }: ProblemListRowProps) {
  const [contest, setContest] = useState<Contest>();
  const [problemTags, setProblemTags] = useState<Tag[]>();
  const navigate = useNavigate();

  useEffect(() => {
    Problem.getContest(problem).then((contest) => setContest(() => contest));
    Problem.getTags(problem).then((tags) => setProblemTags(() => tags));
  }, [problem]);

  const loading = !(contest && problemTags);

  return (
    <tr
      className="bg-purple-50 hover:bg-purple-200 text-slate-600"
      role={loading ? "cell" : "button"}
      onClick={() =>
        navigate(`/contest/${contest!.no}/problem/${problem!.name}`)
      }
    >
      <td
        className={
          "py-3 px-2 border-l border-b  border-l-purple-500 " +
          (last ? "rounded-bl border-b-purple-500" : "border-b-purple-200")
        }
      >
        {loading ? <Skeleton /> : contest!.no}
      </td>
      <td
        className={
          "py-3 px-2 border-b " +
          (last ? "border-b-purple-500" : "border-b-purple-200")
        }
      >
        {loading ? <Skeleton /> : problem!.no}
      </td>
      <td
        className={
          "py-3 px-2 border-b " +
          (last ? "border-b-purple-500" : "border-b-purple-200")
        }
      >
        {loading ? <Skeleton /> : problem!.name}
      </td>
      <td
        className={
          "py-3 px-2 border-b " +
          (last ? "border-b-purple-500" : "border-b-purple-200")
        }
      >
        {loading ? <Skeleton /> : problem!.difficulty}
      </td>
      <td
        className={
          "py-3 px-2 border-b border-r border-r-purple-500 " +
          (last ? "rounded-br border-b-purple-500" : "border-b-purple-200")
        }
      >
        {loading ? (
          <Skeleton />
        ) : (
          problemTags!.map(
            (tag, i) => tag.name + (i + 1 !== problemTags!.length ? ", " : "")
          )
        )}
      </td>
    </tr>
  );
}
