import { Contest } from "../db/collections/Contest";
import { Problem } from "../db/collections/Problem";
import { Tag } from "../db/collections/Tag";

export interface ProblemContextType {
  tags: Tag[];
  contests: Contest[];
  problems: Problem[];
}

export interface AdminContextType {
  isAdmin: boolean;
}
