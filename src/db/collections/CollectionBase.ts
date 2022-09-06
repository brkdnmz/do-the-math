import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../firebase";

export default class CollectionBase {
  static collectionName: string = "unknown";
  static converter: any;

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static async getAll() {
    const docsSnap = await getDocs(collection(db, this.collectionName));
    return docsSnap.docs.map((docSnap) => docSnap.data());
  }

  static async getById(id: string) {
    const docRef = doc(db, this.collectionName, id).withConverter(
      this.converter
    );
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists())
      throw new Error(`Document id in ${this.collectionName} not found: ${id}`);
    return docSnap.data();
  }

  static async getByName(name: string) {
    const docRef = query(
      collection(db, this.collectionName),
      where("name", "==", name)
    ).withConverter(this.converter);
    const docSnap = await getDocs(docRef);

    if (docSnap.size === 0)
      throw new Error(
        `Document name in ${this.collectionName} not found: ${name}`
      );

    if (docSnap.size > 1)
      throw new Error(
        `Multiple documents in ${this.collectionName} with the same name found: ${name}`
      );

    return docSnap.docs[0].data();
  }
}