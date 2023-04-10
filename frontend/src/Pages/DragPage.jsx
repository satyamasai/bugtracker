import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

let list = [
  {
    id: 1,
    bugname: "king",
    severity: "critical",
  },
  {
    id: 2,
    bugname: "queen",
    severity: "critical",
  },
  { id: 3, bugname: "rancho", severity: "critical" },
  { id: 4, bugname: "virus", severity: "critical" },
  { id: 5, bugname: "farhan", severity: "critical" },
];
const DragPage = () => {
  const [users, setUsers] = useState(list);

  const handleDragEnd = (result) => {
    const items = Array.from(users);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    setUsers(items);
    console.log(users);
  };
  return (
    <div className="home">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <div>jasfgijagfujab</div>
          <Droppable droppableId="users">
            {(provided) => (
              <div
                className="users"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {users?.map((item, index) => (
                  <Draggable
                    key={item.bugname}
                    draggableId={item.bugname}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p> ID: {item.id}</p>
                        <h2>{item.bugname}</h2>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragPage;
