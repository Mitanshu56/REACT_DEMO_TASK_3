import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],

  formData: {
    id: null,
    name: "",
    city: "",
    age: "",
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },

    updateUser(state, action) {
      const updatedUser = action.payload;

      const user = state.users.find(
        (user) => user.id === updatedUser.id
      );

      if (user) {
        user.name = updatedUser.name;
        user.city = updatedUser.city;
        user.age = updatedUser.age;
      }
    },

    deleteUser(state, action) {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },

    moveUsers(state, action) {
      const { ids, to } = action.payload;

      state.users.forEach((user) => {
        if (ids.includes(user.id)) {
          user.type = to;
        }
      });
    },

    setFormData(state, action) {
      state.formData = action.payload;
    },

    resetForm(state) {
      state.formData = {
        id: null,
        name: "",
        city: "",
        age: "",
      };
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  moveUsers,
  setFormData,
  resetForm,
} = userSlice.actions;

export default userSlice.reducer;