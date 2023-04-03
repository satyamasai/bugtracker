import React from "react";
import "../Styles/dashboard.css";
import { FcAddDatabase } from "react-icons/fc";
import InitialFocus from "../Components/Modal/Modal";

const Dashboard = () => {
  const handleAddTasks = () => {
   
  };

  return (
    <div className="dashboard_container">
      <div className="tasks_parent">
        <div className="critical_tasks tasks_container">
          <div id="critical" className="task_heading">
            <h1>Critical severity</h1>
            <InitialFocus />
          </div>
        </div>
        <div className="major_tasks tasks_container">
          <div id="major" className="task_heading ">
            <h1>Major severity</h1>
            <InitialFocus  />
          </div>
        </div>
        <div className="medium_tasks tasks_container">
          <div id="medium" className="task_heading">
            <h1>Medium severity</h1>
            <InitialFocus />
          </div>
        </div>
        <div className="low_tasks tasks_container">
          <div id="low" className="task_heading">
            <h1>Low severity</h1>
            <InitialFocus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
