import {
  addDoc,
  deleteDoc,
  DocumentData,
  DocumentReference,
  getDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { CollectionWithNoBase } from "../CollectionWithNoBase";

export class Contest extends CollectionWithNoBase {
  static {
    this.collectionName = "contests";
    this.converter = {
      toFirestore(contest: Contest): DocumentData {
        return {
          no: contest.no,
          name: contest.name,
          problemIds: contest.problemIds,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
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

  static async add(no: number): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.getColRef(), new Contest(no, "#" + no.toString(), []));
  }

  static async removeById(id: string) {
    const contestRef = this.getDocRefById(id);
    const contestSnap = await getDoc(contestRef);
    if (!contestSnap.exists())
      throw Error(`Contest ID to be deleted not found: ${id}`);
    deleteDoc(contestRef);
  }

  static override async getById(id: string): Promise<Contest> {
    return (await super.getById(id)) as Contest;
  }

  static override async getByNo(no: number): Promise<Contest> {
    return (await super.getByNo(no)) as Contest;
  }
}
