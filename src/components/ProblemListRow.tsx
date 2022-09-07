import { useEffect, useState } from "react";
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

  // Get problem
  useEffect(() => {
    Problem.getContest(problem).then((contest) => setContest(() => contest));
    Problem.getTags(problem).then((tags) => setProblemTags(() => tags));
  }, [problem]);

  const loading = !(contest && problemTags);

  if (loading)
    return (
      <tr>
        <td colSpan={5} className="text-center text-secondary">
          Loading...
        </td>
      </tr>
    );

  return (
    <tr
      role="button"
      onClick={() => navigate(`/contest/${contest!.no}/problem/${problem!.no}`)}
    >
      <td>{contest!.no}</td>
      <td>{problem!.no}</td>
      <td>{problem!.name}</td>
      <td>{problem!.difficulty}</td>
      <td>
        {problemTags!.map(
          (tag, i) => tag.name + (i + 1 !== problemTags!.length ? ", " : "")
        )}
      </td>
    </tr>
  );
}
