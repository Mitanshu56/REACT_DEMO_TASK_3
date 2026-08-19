import { useDispatch, useSelector } from "react-redux";

import {
  addUser,
  updateUser,
  setFormData,
  resetForm,
} from "../Store/user-slice";

function UserForm() {
  const dispatch = useDispatch();

  const formData = useSelector(
    (state) => state.users.formData
  );

  function handleChange(event) {
    const { name, value } = event.target;

    dispatch(
      setFormData({
        ...formData,
        [name]: value,
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.city.trim() === "" ||
      formData.age === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.id === null) {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        city: formData.city,
        age: formData.age,
        type: "left",
      };

      dispatch(addUser(newUser));
    } else {
      dispatch(
        updateUser({
          id: formData.id,
          name: formData.name,
          city: formData.city,
          age: formData.age,
        })
      );
    }

    dispatch(resetForm());
  }

  function clearForm() {
    dispatch(resetForm());
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Name</td>

            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>City</td>

            <td>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Age</td>

            <td>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td></td>

            <td>
              <button type="submit">
                {formData.id === null
                  ? "Save"
                  : "Update"}
              </button>

              <button
                type="button"
                onClick={clearForm}
                style={{
                  marginLeft: "10px",
                }}
              >
                Reset
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default UserForm;