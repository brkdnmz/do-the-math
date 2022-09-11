import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";
import { Tag } from "../db/collections/Tag";

interface ProblemListRowProps {
  problem: Problem;
}

export default function ProblemListRow({ problem }: ProblemListRowProps) {
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
      role={loading ? "cell" : "button"}
      onClick={() =>
        navigate(`/contest/${contest!.no}/problem/${problem!.name}`)
      }
    >
      <td>{loading ? <Skeleton /> : contest!.no}</td>
      <td>{loading ? <Skeleton /> : problem!.no}</td>
      <td>{loading ? <Skeleton /> : problem!.name}</td>
      <td>{loading ? <Skeleton /> : problem!.difficulty}</td>
      <td>
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
