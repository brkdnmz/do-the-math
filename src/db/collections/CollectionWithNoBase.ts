import {
  DocumentData,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import CollectionBase from "./CollectionBase";

export class CollectionWithNoBase extends CollectionBase {
  no: number;

  constructor(name: string, no: number) {
    super(name);
    this.no = no;
  }

  static getQueryRefByNo(no: number): Query<DocumentData> {
    return query(this.getColRef(), where("no", "==", no));
  }

  static async getDocSnapByNo(
    no: number
  ): Promise<QueryDocumentSnapshot<DocumentData>> {
    const docSnap = await getDocs(this.getQueryRefByNo(no));

    if (docSnap.size === 0)
      throw Error(`Document no in ${this.collectionName} not found: ${no}`);

    if (docSnap.size > 1)
      throw Error(
        `Multiple documents in ${this.collectionName} with the same no found: ${no}`
      );

    return docSnap.docs[0];
  }

  static async getByNo(no: number): Promise<DocumentData> {
    return (await this.getDocSnapByNo(no)).data();
  }

  static async getIdByNo(no: number): Promise<string> {
    return (await this.getDocSnapByNo(no)).id;
  }

  static async existsByNo(no: number): Promise<boolean> {
    const querySnap = await getDocs(this.getQueryRefByNo(no));
    return !querySnap.empty;
  }
}
