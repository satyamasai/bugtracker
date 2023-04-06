import React, { useEffect, useState } from "react";
import "../Styles/dashboard.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
// import {BsFillTrash3Fill } from "react-icons/fc";
import { BsFillTrash3Fill } from "react-icons/bs";
import InitialFocus from "../Components/Modal/Modal";

const Dashboard = () => {
  // const [bugname, setBugname] = useState("");
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
  }, []);

  // -------------adding bug in database--------------------------
  const handleBug = (severity, bugname) => {
    const bugData = { severity, bugname };
    axios
      .post("http://localhost:8080/addbug", bugData)

      .then((res) => {
        console.log(res);
        getBugs();
      })
      .catch((err) => console.log(err));
  };
  // ------------- setting bugs in there ,context--------------------------
  console.log(allBugs);
  if (allBugs) {
    criticalBugs = allBugs?.filter((item) => {
      return item.severity === "critical";
    });
    // major bugs------------------
    majorBugs = allBugs?.filter((item) => {
      return item.severity === "major";
    });
    mediumBugs = allBugs?.filter((item) => {
      return item.severity === "medium";
    });
    lowBugs = allBugs?.filter((item) => {
      return item.severity === "low";
    });

    // console.log(criticalBugs,"CB")
  }

  // -----------------------------------------------------------------------

  // ------------------for drag and drop--------------------------------
  const onDragEnd = (result) => {
    console.log(result, "result");
    if (!result.destination) return;
    const newItems = Array.from(allBugs);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setAllBugs(newItems);
  };

  // ---------------------------------------------------

  // -------handle delete bugg--------------
  const handleDeleteBug = () => {
    console.log("bug deleted");
    alert("bug resolved");
  };

  return (
    <div className="dashboard_container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tasks_parent">
          <div className=" tasks_container">
            <div id="critical" className="task_heading">
              <h1>Critical severity</h1>
              <InitialFocus severity={"critical"} handleBug={handleBug} />
            </div>
            <Droppable droppableId="droppable-1">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="critical_tasks"
                >
                  {criticalBugs?.map((item, index) => (
                    <Draggable
                      draggableId={item._id}
                      key={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          draggableId={item._id}
                          index={index}
                          className="bugdiv"
                        >
                          <div>{item.bugname}</div>
                          <BsFillTrash3Fill onClick={handleDeleteBug} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
