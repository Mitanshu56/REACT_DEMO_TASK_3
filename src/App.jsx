import UserForm from "./Components/UserForm";
import RenderList from "./Components/RenderList";
import UserTableView from "./Components/UserTableView";

function App() {
  return (
    <>
      <h1>React Demo Task</h1>

      <UserForm />

      <hr />

      <RenderList />

      <hr />

      <UserTableView />
    </>
  );
}

export default App;