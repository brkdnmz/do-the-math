import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";
import { Tag } from "../db/collections/Tag";
import db from "../db/firebase";
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
    const collections = [
      collection(db, Problem.collectionName),
      collection(db, Tag.collectionName),
      collection(db, Contest.collectionName),
    ];
    const unsubscribeListenerFns = collections.map((collection) =>
      onSnapshot(collection, () => fetchAllData())
    );

    const fetchAllData = async () => {
      const fetchedData = {
        tags: (await Tag.getAll()).sort((tag1, tag2) =>
          tag1.name < tag2.name ? -1 : 1
        ),
        contests: await Contest.getAll(),
        problems: await Problem.getAll(),
      } as ProblemContextType;

      setData(() => fetchedData);
    };

    fetchAllData();
    return () => {
      unsubscribeListenerFns.forEach((unsubscribeFn) => unsubscribeFn());
    };
  }, []);

  return (
    <ProblemContext.Provider value={data}>{children}</ProblemContext.Provider>
  );
}
