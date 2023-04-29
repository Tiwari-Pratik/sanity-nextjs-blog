import { create } from "zustand";
// import {z} from "zod"

// const RoleEnum = z.enum(["PERSON", "EVENT", "ORGANIZATION"]);
// type Role = z.infer<typeof RoleEnum>;

// const nodeObject = z.object({
//   name: z.string(),
//   nickName: z.string(),
//   role: RoleEnum
// })

// type Node = z.infer<typeof nodeObject>;

interface RelationState {
  people: string[];
  events: string[];
  orgs: string[];
  addPeople: (nickName: string) => void;
  addEvent: (nickName: string) => void;
  addOrg: (nickName: string) => void;
}

const useRelationStore = create<RelationState>()((set) => ({
  people: [],
  events: [],
  orgs: [],
  addPeople: (nickName) => {
    set((state) => ({
      people: [...state.people, nickName],
    }));
  },
  addEvent: (nickName) => {
    set((state) => ({
      events: [...state.events, nickName],
    }));
  },
  addOrg: (nickName) => {
    set((state) => ({
      orgs: [...state.orgs, nickName],
    }));
  },
}));

export default useRelationStore;
