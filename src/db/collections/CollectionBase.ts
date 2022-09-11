import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import db from "../firebase";

export default class CollectionBase {
  static collectionName = "unknown";
  static converter: any;

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * @returns Collection reference with converter.
   */
  static getColRef(): CollectionReference<DocumentData> {
    return collection(db, this.collectionName).withConverter(this.converter);
  }

  static getDocRefById(id: string): DocumentReference<DocumentData> {
    if (!id.length) throw Error("id must not be empty");
    return doc(this.getColRef(), id);
  }

  static getQueryRefByName(name: string): Query<DocumentData> {
    return query(this.getColRef(), where("name", "==", name));
  }

  static async getAll(): Promise<DocumentData[]> {
    const docsSnap = await getDocs(this.getColRef());
    return docsSnap.docs.map((docSnap) => docSnap.data());
  }

  static async getById(id: string): Promise<DocumentData> {
    const docRef = this.getDocRefById(id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      throw Error(`Document id in ${this.collectionName} not found: ${id}`);
    return docSnap.data();
  }

  static async getDocSnapByName(
    name: string
  ): Promise<QueryDocumentSnapshot<DocumentData>> {
    const querySnap = await getDocs(this.getQueryRefByName(name));

    if (querySnap.size === 0)
      throw Error(`Document name in ${this.collectionName} not found: ${name}`);

    if (querySnap.size > 1)
      throw Error(
        `Multiple documents in ${this.collectionName} with the same name found: ${name}`
      );

    return querySnap.docs[0];
  }

  static async getByName(name: string): Promise<DocumentData> {
    return (await this.getDocSnapByName(name)).data();
  }

  static async getIdByName(name: string): Promise<string> {
    return (await this.getDocSnapByName(name)).id;
  }

  static async existsByName(name: string): Promise<boolean> {
    const querySnap = await getDocs(this.getQueryRefByName(name));
    return !querySnap.empty;
  }
}
