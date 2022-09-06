import { createContext, useEffect, useState } from "react";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";
import { Tag } from "../db/collections/Tag";
import ProblemContextType from "./types";

const emptyContextData: ProblemContextType = {
  tags: [],
  contests: [],
  problems: [],
};

export const ProblemContext =
  createContext<ProblemContextType>(emptyContextData);

export function ProblemProvider({ children }: any) {
  const [data, setData] = useState<ProblemContextType>(emptyContextData);

  // Get all data on startup
  useEffect(() => {
    const fetchAllData = async () => {
      const fetchedData = {
        tags: await Tag.getAll(),
        contests: await Contest.getAll(),
        problems: await Problem.getAll(),
      } as ProblemContextType;

      setData(() => fetchedData);
    };

    fetchAllData();
  }, []);

  return (
    <ProblemContext.Provider value={data}>{children}</ProblemContext.Provider>
  );
}
