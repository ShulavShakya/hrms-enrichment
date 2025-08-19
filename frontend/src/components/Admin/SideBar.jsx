import React from "react";
import Cookies from "js-cookie";

const SideBar = ({ activeTab, setActiveTab }) => {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const role = user.role;

  const sidebarItems =
    role === "admin"
      ? [
          { id: "dashboard", name: "Dashboard" },
          { id: "employees", name: "Employees" },
          { id: "departments", name: "Departments" },
          { id: "attendance", name: "Attendance" },
          { id: "leave-requests", name: "Leave Requests" },
        ]
      : [
          { id: "dashboard", name: "Dashboard" },
          { id: "attendance", name: "Attendance" },
          { id: "profile", name: "Profile" },
        ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="p-4">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left p-3 rounded mb-2 transition-colors ${
              activeTab === item.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
