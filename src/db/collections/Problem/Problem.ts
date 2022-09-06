import * as firestore from "firebase/firestore";
import { CollectionWithNoBase } from "../CollectionWithNoBase";
import { Contest } from "../Contest";
import { Tag } from "../Tag";

export class Problem extends CollectionWithNoBase {
  static {
    this.collectionName = "problems";
    this.converter = {
      toFirestore(problem: Problem): firestore.DocumentData {
        return {
          no: problem.no,
          name: problem.name,
          difficulty: problem.difficulty,
          tagIds: problem.tagIds,
          statement: problem.statement,
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
          data.tagIds,
          data.statement,
          data.contestId
        );
      },
    };
  }

  difficulty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  tagIds: string[];
  statement: string;
  contestId: string;

  constructor(
    no: number,
    name: string,
    difficulty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    tagIds: string[],
    statement: string,
    contestId: string
  ) {
    super(name, no);
    this.name = name;
    this.difficulty = difficulty;
    this.tagIds = tagIds;
    this.statement = statement;
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
}
