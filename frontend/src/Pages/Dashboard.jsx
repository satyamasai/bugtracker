import React, { useEffect, useMemo, useState } from "react";
import "../Styles/dashboard.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
// import {BsFillTrash3Fill } from "react-icons/fc";
import { BsFillTrash3Fill } from "react-icons/bs";
import InitialFocus from "../Components/Modal/Modal";
import { useToast } from "@chakra-ui/react";

const Dashboard = () => {
  const toast = useToast();
  // const [bugname, setBugname] = useState("");
  const [allBugs, setAllBugs] = useState([]);
  const [criticalBugs, setCriticalBugs] = useState([]);
  const [majorBugs, setMajorBugs] = useState([]);
  const [mediumBugs, setMediumBugs] = useState([]);
  const [lowBugs, setLowBugs] = useState([]);
  // const [totalCount, setTotalCount] = useState(allBugs[allBugs.length-1]?.id);

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

  //---------------adding bug in database----------------------------------------------------------------------
  const handleBug = (severity, bugname) => {
    const bugData = { severity, bugname };

    axios
      .post("http://localhost:8080/addbug", bugData)

      .then((res) => {
        console.log(res.data);
        // setTotalCount(((++allBugs[allBugs.length-1].id)))
        toast({
          title: "Alert",
          description: `${res.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getBugs();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Alert",
          status: err.status,
          description: err.response.data.msg,
          isClosable: true,
        });
      });
  };
  // ------------- setting bugs in there ,context--------------------------
  // console.log(allBugs);
  useEffect(() => {
    let cb = allBugs?.filter((item) => {
      return item.severity === "critical";
    });
    setCriticalBugs(cb);

    // major bugs------------------
    let mb = allBugs?.filter((item) => {
      return item.severity === "major";
    });
    setMajorBugs(mb);

    // medium bugs------------------
    let medb = allBugs?.filter((item) => {
      return item.severity === "medium";
    });
    setMediumBugs(medb);

    // low bugs------------------
    let lb = allBugs?.filter((item) => {
      return item.severity === "low";
    });
    setLowBugs(lb);
  }, [allBugs]);

  // -----------------------------------------------------------------------

  // ------------------for drag and drop--------------------------------
  const handleDragEndCr = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(criticalBugs);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    setCriticalBugs(items);
    // console.log(users);
  };

  const handleDragEndMj = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(majorBugs);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    setMajorBugs(items);
    // console.log(users);
  };

  const handleDragEndMd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(mediumBugs);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    setMediumBugs(items);
    // console.log(users);
  };

  const handleDragEndLw = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(lowBugs);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    setLowBugs(items);
    // console.log(users);
  };

  // -------------------------------------------------------------------------------------------------

  // -------handle delete bugg-------------------------------------------------------------------------
  const handleDeleteBug = (uid) => {
    console.log("bug deleted", uid);

    axios
      .delete(`http://localhost:8080/deleteBug/${uid}`)
      .then((res) => {
        console.log(res);
        getBugs();
      })
      .catch((err) => {
        console.log(err);
      });

    // alert("bug resolved");
  };

  return (
    <div className="dashboard_container">
      <div className="tasks_parent">
        <div className=" tasks_container">
          <div id="critical" className="task_heading">
            <h1>Critical severity</h1>
            <InitialFocus severity={"critical"} handleBug={handleBug} />
          </div>
          <DragDropContext onDragEnd={handleDragEndCr}>
            <Droppable droppableId="bugs">
              {(provided) => (
                <div
                  className="bugs"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {criticalBugs?.map((item, index) => (
                    <Draggable
                      key={item.bugname}
                      draggableId={item.bugname}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bugdiv"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <p> ID: {item.id}</p>
                          <div>
                            <h2>{item.bugname}</h2>
                          </div>
                          <BsFillTrash3Fill
                            onClick={() => handleDeleteBug(item._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* major---severity -----------section */}

        <div className="major_tasks tasks_container">
          <div id="major" className="task_heading ">
            <h1>Major severity</h1>
            <InitialFocus severity={"major"} handleBug={handleBug} />
          </div>
          <DragDropContext onDragEnd={handleDragEndMj}>
            <Droppable droppableId="bugs">
              {(provided) => (
                <div
                  className="bugs"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {majorBugs?.map((item, index) => (
                    <Draggable
                      key={item.bugname}
                      draggableId={item.bugname}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bugdiv"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <p> ID: {item.id}</p>
                          <div>
                            <h2>{item.bugname}</h2>
                          </div>
                          <BsFillTrash3Fill
                            onClick={() => handleDeleteBug(item._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="medium_tasks tasks_container">
          <div id="medium" className="task_heading">
            <h1>Medium severity</h1>
            <InitialFocus severity={"medium"} handleBug={handleBug} />
          </div>
          <DragDropContext onDragEnd={handleDragEndMd}>
            <Droppable droppableId="bugs">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="critical_tasks bugs"
                >
                  {mediumBugs?.map((item, index) => (
                    <Draggable
                      key={item.bugname}
                      draggableId={item.bugname}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bugdiv"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <p> ID: {item.id}</p>
                          <div>
                            <h2>{item.bugname}</h2>
                          </div>
                          <BsFillTrash3Fill
                            onClick={() => handleDeleteBug(item._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="low_tasks tasks_container">
          <div id="low" className="task_heading">
            <h1>Low severity</h1>
            <InitialFocus severity={"low"} handleBug={handleBug} />
          </div>
          <DragDropContext onDragEnd={handleDragEndLw}>
            <Droppable droppableId="bugs">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="critical_tasks"
                >
                  {lowBugs?.map((item, index) => (
                    <Draggable
                      key={item.bugname}
                      draggableId={item.bugname}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bugdiv"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <p> ID: {item.id}</p>
                          <div>
                            <h2>{item.bugname}</h2>
                          </div>
                          <BsFillTrash3Fill
                            onClick={() => handleDeleteBug(item._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
