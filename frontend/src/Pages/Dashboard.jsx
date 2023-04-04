import React, { useEffect, useState } from "react";
import "../Styles/dashboard.css";
import axios from "axios";
import { FcAddDatabase } from "react-icons/fc";
import InitialFocus from "../Components/Modal/Modal";

const Dashboard = () => {
  const [bugname, setBugname] = useState("");
  const [allBugs, setAllBugs] = useState("");
  let criticalBugs;
  let majorBugs;
  let mediumBugs;
  let lowBugs;
  // const [criticalBugs,setCriticalBugs]= useState('')
  // const [majorBugs,setMajorBugs]= useState('')
  // const [mediumBugs,setMediumBugs]= useState('')
  // const [lowBugs,setLowBugs]= useState('')
  // const[s,setBugname]=useState('')
  // -------------------fetching bugs from database-----------------

  const getBugs = () => {
    axios
      .get("http://localhost:8080/getBugs")
      .then((res) => {
        setAllBugs(res.data.allBugs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBugs();
  }, [bugname]);

  // -------------adding bug in database--------------------------
  const handleBug = (severity, bugname) => {
    const bugData = { severity, bugname };
    axios
      .post("http://localhost:8080/addbug", bugData)

      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // ------------- setting bugs in there ,context--------------------------
  console.log(allBugs);
  if (allBugs) {
    criticalBugs = allBugs?.filter((item) => {
      return item.severity == "critical";
    });
    // major bugs------------------
    majorBugs = allBugs?.filter((item) => {
      return item.severity == "major";
    });
    mediumBugs = allBugs?.filter((item) => {
      return item.severity == "medium";
    });
    lowBugs = allBugs?.filter((item) => {
      return item.severity == "low";
    });

    // console.log(criticalBugs,"CB")
  }

  // -----------------------------------------------------------------------
  return (
    <div className="dashboard_container">
      <div className="tasks_parent">
        <div className=" tasks_container">
          <div id="critical" className="task_heading">
            <h1>Critical severity</h1>
            <InitialFocus severity={"critical"} handleBug={handleBug} />
          </div>
          <div className="critical_tasks">
            {criticalBugs?.map((item) => (
              <div key={item.id} className="bugdiv">
                {item.bugname}
              </div>
            ))}
          </div>
        </div>
        <div className="major_tasks tasks_container">
          <div id="major" className="task_heading ">
            <h1>Major severity</h1>
            <InitialFocus severity={"major"} handleBug={handleBug} />
          </div>

          <div className="critical_tasks">
            {majorBugs?.map((item) => (
              <div key={item.id} className="bugdiv">
                {item.bugname}
              </div>
            ))}
          </div>
        </div>
        <div className="medium_tasks tasks_container">
          <div id="medium" className="task_heading">
            <h1>Medium severity</h1>
            <InitialFocus severity={"medium"} handleBug={handleBug} />
          </div>

          <div className="critical_tasks">
            {mediumBugs?.map((item) => (
              <div key={item.id} className="bugdiv">
                {item.bugname}
              </div>
            ))}
          </div>
        </div>
        <div className="low_tasks tasks_container">
          <div id="low" className="task_heading">
            <h1>Low severity</h1>
            <InitialFocus severity={"low"} handleBug={handleBug} />
          </div>

          <div className="critical_tasks">
            {lowBugs?.map((item) => (
              <div key={item.id} className="bugdiv">
                {item.bugname}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
