import * as firestore from "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase";
import CollectionBase from "../CollectionBase";

export class Tag extends CollectionBase {
  static {
    this.collectionName = "tags";
    this.converter = {
      toFirestore(tag: Tag): firestore.DocumentData {
        return { name: tag.name };
      },
      fromFirestore(
        snapshot: firestore.QueryDocumentSnapshot,
        options: firestore.SnapshotOptions
      ): Tag {
        const data = snapshot.data(options)!;

        return new Tag(data.name);
      },
    };
  }
  constructor(name: string) {
    super(name);
  }

  static override async getById(id: string) {
    return (await super.getById(id)) as Tag;
  }

  static async add(name: string) {
    const colRef = collection(db, this.collectionName).withConverter(
      this.converter
    );
    const docRef = query(colRef, where("name", "==", name));
    const docSnap = await getDocs(docRef);

    if (!docSnap.empty) {
      throw Error(`Tag to be added already exists: ${name}`);
    }

    addDoc(colRef, new Tag(name));
  }

  static async delete(name: string) {
    const colRef = collection(db, this.collectionName).withConverter(
      this.converter
    );
    const docRef = query(
      collection(db, this.collectionName),
      where("name", "==", name)
    );
    const docSnap = await getDocs(docRef);
    if (docSnap.empty) throw Error(`Tag to be deleted does not exist: ${name}`);
    deleteDoc(docSnap.docs[0].ref);
  }
}
