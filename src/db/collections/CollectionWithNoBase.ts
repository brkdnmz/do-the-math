import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import CollectionBase from "./CollectionBase";

export class CollectionWithNoBase extends CollectionBase {
  no: number;

  constructor(name: string, no: number) {
    super(name);
    this.no = no;
  }

  private static async getDocByNo(no: number) {
    const docRef = query(
      collection(db, this.collectionName),
      where("no", "==", no)
    ).withConverter(this.converter);
    const docSnap = await getDocs(docRef);

    if (docSnap.size === 0)
      throw Error(`Document no in ${this.collectionName} not found: ${no}`);

    if (docSnap.size > 1)
      throw Error(
        `Multiple documents in ${this.collectionName} with the same no found: ${no}`
      );

    return docSnap.docs[0];
  }

  static async getByNo(no: number) {
    return (await this.getDocByNo(no)).data();
  }

  static async getIdByNo(no: number) {
    return (await this.getDocByNo(no)).id;
  }
}
