import * as firestore from "firebase/firestore";
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
    this.name = name;
  }

  static override async getById(id: string) {
    return (await super.getById(id)) as Tag;
  }
}
