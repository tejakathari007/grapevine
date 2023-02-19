import logo from "./logo.svg";
import "./App.css";
import Router from "./Router/router";
import AdminContext from "./Context/AdminContext";

function App() {
  return (
    <div className="App">
      <AdminContext>
        <Router />
      </AdminContext>
    </div>
  );
}

export default App;
