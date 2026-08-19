import { useState } from "react";

function Filter({
  rightUsers,
  onFilterChange,
}) {
  const [filter, setFilter] = useState({
    field: "",
    value: "",
  });

  const uniqueValues = filter.field
    ? [
        ...new Set(
          rightUsers.map((user) =>
            String(user[filter.field])
          )
        ),
      ]
    : [];

  function handleFieldChange(event) {
    const newFilter = {
      field: event.target.value,
      value: "",
    };

    setFilter(newFilter);
    onFilterChange(newFilter);
  }

  function handleValueChange(event) {
    const newFilter = {
      ...filter,
      value: event.target.value,
    };

    setFilter(newFilter);
    onFilterChange(newFilter);
  }

  function showAll() {
    const newFilter = {
      field: "",
      value: "",
    };

    setFilter(newFilter);
    onFilterChange(newFilter);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <label>Select Field : </label>

      <select
        value={filter.field}
        onChange={handleFieldChange}
      >
        <option value="">Select</option>
        <option value="name">Name</option>
        <option value="city">City</option>
        <option value="age">Age</option>
      </select>

      &nbsp;&nbsp;

      <label>
        Unique Value :{" "}
      </label>

      <select
        value={filter.value}
        onChange={handleValueChange}
        disabled={!filter.field}
      >
        <option value="">Select</option>

        {uniqueValues.map((value) => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>

      &nbsp;

      <button onClick={showAll}>
        All
      </button>
    </div>
  );
}

export default Filter;