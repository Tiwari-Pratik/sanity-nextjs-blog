import Dashboard from "@/components/dashboard/Dashboard";
import NodeForm from "@/components/form/NodeForm";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardPage = () => {
  return (
    <Dashboard>
      <Sidebar />
      <NodeForm />
    </Dashboard>
  );
};

export default DashboardPage;
