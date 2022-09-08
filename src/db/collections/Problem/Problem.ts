import * as firestore from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firebase";
import { CollectionWithNoBase } from "../CollectionWithNoBase";
import { Contest } from "../Contest";
import { Tag } from "../Tag";

export type ProblemDifficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export class Problem extends CollectionWithNoBase {
  static {
    this.collectionName = "problems";
    this.converter = {
      toFirestore(problem: Problem): firestore.DocumentData {
        return {
          no: problem.no,
          name: problem.name,
          difficulty: problem.difficulty,
          statement: problem.statement,
          tagIds: problem.tagIds,
          contestId: problem.contestId,
        };
      },
      fromFirestore(
        snapshot: firestore.QueryDocumentSnapshot,
        options: firestore.SnapshotOptions
      ): Problem {
        const data = snapshot.data(options)!;
        return new Problem(
          data.no,
          data.name,
          data.difficulty,
          data.statement,
          data.tagIds,
          data.contestId
        );
      },
    };
  }

  difficulty: ProblemDifficulty;
  statement: string;
  tagIds: string[];
  contestId: string;

  constructor(
    no: number,
    name: string,
    difficulty: ProblemDifficulty,
    statement: string,
    tagIds: string[],
    contestId: string
  ) {
    super(name, no);
    this.name = name;
    this.difficulty = difficulty;
    this.statement = statement;
    this.tagIds = tagIds;
    this.contestId = contestId;
  }

  static override async getById(id: string) {
    return (await super.getById(id)) as Problem;
  }

  static override async getByName(name: string) {
    return (await super.getByName(name)) as Problem;
  }

  static async getContest(problem: Problem) {
    return await Contest.getById(problem.contestId);
  }

  static async getTags(problem: Problem) {
    return await Promise.all(problem.tagIds.map((tagId) => Tag.getById(tagId)));
  }

  static async add(
    no: number,
    name: string,
    difficulty: ProblemDifficulty,
    statement: string,
    tags: Tag[],
    contestNo: number
  ) {
    const tagIds = await Promise.all(
      tags.map((tag) => Tag.getIdByName(tag.name))
    );
    const contestId = await Contest.getIdByNo(contestNo);

    const colRef = collection(db, this.collectionName).withConverter(
      this.converter
    );

    const newProblem = new Problem(
      no,
      name,
      difficulty,
      statement,
      tagIds,
      contestId
    );
    addDoc(colRef, newProblem);
  }
}
