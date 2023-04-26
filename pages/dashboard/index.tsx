import Dashboard from "@/components/dashboard/Dashboard";
import NodeForm from "@/components/form/NodeForm";
import Sidebar from "@/components/sidebar/Sidebar";
// import { useState } from "react";

const DashboardPage = () => {
  // const [node, setNode] = useState<string | null>(null);
  // const [role, setRole] = useState<string | null>(null);
  //
  // const nodeClickhandler = (id: string, rol: string) => {
  //   setNode(id);
  //   setRole(rol);
  // };
  return (
    <Dashboard>
      <Sidebar />
      <NodeForm />
    </Dashboard>
  );
};

export default DashboardPage;
