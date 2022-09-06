import * as firestore from "firebase/firestore";
import { CollectionWithNoBase } from "../CollectionWithNoBase";

export class Contest extends CollectionWithNoBase {
  static {
    this.collectionName = "contests";
    this.converter = {
      toFirestore(contest: Contest): firestore.DocumentData {
        return {
          no: contest.no,
          name: contest.name,
          problemIds: contest.problemIds,
        };
      },
      fromFirestore(
        snapshot: firestore.QueryDocumentSnapshot,
        options: firestore.SnapshotOptions
      ): Contest {
        const data = snapshot.data(options)!;
        return new Contest(data.no, data.name, data.problemIds);
      },
    };
  }

  problemIds: string[];

  constructor(no: number, name: string, problemIds: string[]) {
    super(name, no);
    this.problemIds = problemIds;
  }

  static override async getById(id: string) {
    return (await super.getById(id)) as Contest;
  }
}
