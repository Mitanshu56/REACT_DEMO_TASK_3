import { useDispatch, useSelector } from "react-redux";

import { moveUsers } from "../store/user-slice";

function MoveButtons({
  selected,
  setSelected,
}) {
  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users.users
  );

  function moveUsersHandler(
    from,
    to,
    moveAll = false
  ) {
    let idsToMove = [];

    if (moveAll) {
      idsToMove = users
        .filter(
          (user) => user.type === from
        )
        .map((user) => user.id);
    } else {
      idsToMove = selected.filter((id) => {
        const user = users.find(
          (user) => user.id === id
        );

        return user?.type === from;
      });
    }

    if (idsToMove.length === 0) {
      return;
    }

    dispatch(
      moveUsers({
        ids: idsToMove,
        to,
      })
    );

    setSelected([]);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        onClick={() =>
          moveUsersHandler(
            "left",
            "right"
          )
        }
      >
        &gt;
      </button>

      <button
        onClick={() =>
          moveUsersHandler(
            "left",
            "right",
            true
          )
        }
      >
        &gt;&gt;
      </button>

      <button
        onClick={() =>
          moveUsersHandler(
            "right",
            "left"
          )
        }
      >
        &lt;
      </button>

      <button
        onClick={() =>
          moveUsersHandler(
            "right",
            "left",
            true
          )
        }
      >
        &lt;&lt;
      </button>
    </div>
  );
}

export default MoveButtons;