import {
  addDoc,
  deleteDoc,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import CollectionBase from "../CollectionBase";

export class Tag extends CollectionBase {
  static {
    this.collectionName = "tags";
    this.converter = {
      toFirestore(tag: Tag): DocumentData {
        return { name: tag.name };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
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
    const tagSnap = await getDocs(this.getQueryRefByName(name));

    if (!tagSnap.empty) throw Error(`Tag to be added already exists: ${name}`);

    addDoc(this.getColRef(), new Tag(name));
  }

  static async delete(name: string) {
    const docSnap = await getDocs(this.getQueryRefByName(name));

    if (docSnap.empty) throw Error(`Tag to be deleted does not exist: ${name}`);

    deleteDoc(docSnap.docs[0].ref);
  }
}
