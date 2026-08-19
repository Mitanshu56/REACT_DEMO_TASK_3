import { useSelector } from "react-redux";
import { useState } from "react";

import List from "./List";
import MoveButtons from "./MoveButtons";

function RenderList() {
  const users = useSelector(
    (state) => state.users.users
  );

  const [selected, setSelected] = useState([]);

  const leftUsers = users.filter(
    (user) => user.type === "left"
  );

  const rightUsers = users.filter(
    (user) => user.type === "right"
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        marginTop: "20px",
      }}
    >
      <List
        title="Left List"
        users={leftUsers}
        selected={selected}
        setSelected={setSelected}
      />

      <MoveButtons
        selected={selected}
        setSelected={setSelected}
      />

      <List
        title="Right List"
        users={rightUsers}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

export default RenderList;