function List({
  title,
  users,
  selected,
  setSelected,
}) {
  function handleChange(event) {
    const selectedIds = Array.from(
      event.target.selectedOptions,
      (option) => Number(option.value)
    );

    setSelected(selectedIds);
  }

  const selectedValues =
    selected.map(String);

  return (
    <div>
      <h3>{title}</h3>

      <select
        multiple
        size={10}
        value={selectedValues}
        onChange={handleChange}
        style={{
          width: "180px",
          height: "200px",
        }}
      >
        {users.length === 0 ? (
          <option disabled>
            No Data
          </option>
        ) : (
          users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default List;