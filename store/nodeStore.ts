import { create } from "zustand";

interface NodeState {
  node: string;
  role: string;
  update: (node: string, role: string) => void;
}

const useNodeStore = create<NodeState>()((set) => ({
  node: "",
  role: "",
  update: (node, role) => set(() => ({ node: node, role: role })),
}));

export default useNodeStore;
