import {
  addDoc,
  arrayRemove,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";
import { CollectionWithNoBase } from "../CollectionWithNoBase";
import { Contest } from "../Contest";
import { Tag } from "../Tag";

export type ProblemDifficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export class Problem extends CollectionWithNoBase {
  static {
    this.collectionName = "problems";
    this.converter = {
      toFirestore(problem: Problem): DocumentData {
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
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
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

  static async add(
    problemNo: number,
    problemName: string,
    difficulty: ProblemDifficulty,
    statement: string,
    tags: Tag[],
    contestNo: number
  ) {
    const tagIds = await Promise.all(
      tags.map((tag) => Tag.getIdByName(tag.name))
    );

    /*
      1. Add problem with contestId = ""
      2. Add problemId to the contest with contestNo
      3. Update problem's contestId
    */

    const newProblem = new Problem(
      problemNo,
      problemName,
      difficulty,
      statement,
      tagIds,
      ""
    );

    const problemRef = await addDoc(this.getColRef(), newProblem);
    await Contest.addProblemId(contestNo, problemName);
    updateDoc(problemRef, {
      contestId: await Contest.getIdByNo(contestNo),
    });
  }

  static async removeByName(problemName: string) {
    const problemSnap = await this.getDocSnapByName(problemName);

    if (!problemSnap.exists())
      throw Error(`Problem name to be removed not found: ${problemName}`);

    const problem = await this.getByName(problemName);
    await deleteDoc(problemSnap.ref);

    const contestId = problem.contestId;
    const contestRef = Contest.getDocRefById(contestId);
    await updateDoc(contestRef, {
      problemIds: arrayRemove(this.getIdByName(problemName)),
    });
    const contest = await Contest.getById(contestId);
    if (!contest.problemIds.length) Contest.removeById(contestId);
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
