import { useState } from "react";
import SideBar from "../../components/Admin/SideBar";
import Dashboard from "../Dashboard";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "attendance":
        return <Attendance />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar activeTab={activeTab} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};
