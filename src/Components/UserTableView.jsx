import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  deleteUser,
  setFormData,
} from "../Store/user-slice";

import Filter from "./Filter";
import { useState } from "react";

function UserTableView() {
  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users.users
  );

  const [filter, setFilter] = useState({
    field: "",
    value: "",
  });

  const [sortConfig, setSortConfig] =
    useState({
      field: "",
      order: "",
    });

  const rightUsers = users.filter(
    (user) => user.type === "right"
  );

  let tableUsers = rightUsers;

  // FILTER

  if (
    filter.field &&
    filter.value
  ) {
    tableUsers = rightUsers.filter(
      (user) =>
        String(user[filter.field]) ===
        filter.value
    );
  }

  // SORT

  if (sortConfig.field) {
    tableUsers = [...tableUsers].sort(
      (a, b) => {
        let first =
          a[sortConfig.field];

        let second =
          b[sortConfig.field];

        if (
          sortConfig.field === "age"
        ) {
          first = Number(first);
          second = Number(second);
        } else {
          first = String(
            first
          ).toLowerCase();

          second = String(
            second
          ).toLowerCase();
        }

        if (first < second) {
          return sortConfig.order === "asc"
            ? -1
            : 1;
        }

        if (first > second) {
          return sortConfig.order === "asc"
            ? 1
            : -1;
        }

        return 0;
      }
    );
  }

  function sortUsers(field, order) {
    setSortConfig({
      field,
      order,
    });
  }

  function handleDelete(id) {
    dispatch(deleteUser(id));
  }

  function handleEdit(user) {
    dispatch(
      setFormData({
        id: user.id,
        name: user.name,
        city: user.city,
        age: user.age,
      })
    );
  }

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <>
      <Filter
        rightUsers={rightUsers}
        onFilterChange={setFilter}
      />

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>
              Name

              <button
                onClick={() =>
                  sortUsers(
                    "name",
                    "asc"
                  )
                }
              >
                ▲
              </button>

              <button
                onClick={() =>
                  sortUsers(
                    "name",
                    "desc"
                  )
                }
              >
                ▼
              </button>
            </th>

            <th style={cellStyle}>
              City

              <button
                onClick={() =>
                  sortUsers(
                    "city",
                    "asc"
                  )
                }
              >
                ▲
              </button>

              <button
                onClick={() =>
                  sortUsers(
                    "city",
                    "desc"
                  )
                }
              >
                ▼
              </button>
            </th>

            <th style={cellStyle}>
              Age

              <button
                onClick={() =>
                  sortUsers(
                    "age",
                    "asc"
                  )
                }
              >
                ▲
              </button>

              <button
                onClick={() =>
                  sortUsers(
                    "age",
                    "desc"
                  )
                }
              >
                ▼
              </button>
            </th>

            <th style={cellStyle}>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {tableUsers.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={cellStyle}
              >
                No Data Found
              </td>
            </tr>
          ) : (
            tableUsers.map((user) => (
              <tr key={user.id}>
                <td style={cellStyle}>
                  {user.name}
                </td>

                <td style={cellStyle}>
                  {user.city}
                </td>

                <td style={cellStyle}>
                  {user.age}
                </td>

                <td style={cellStyle}>
                  <button
                    onClick={() =>
                      handleEdit(user)
                    }
                  >
                    Edit
                  </button>

                  {" "}

                  <button
                    onClick={() =>
                      handleDelete(
                        user.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default UserTableView;