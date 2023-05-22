import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Regiser";
import LoginForm from "./pages/Login";
import CreateUserForm from "./pages/users/UserCreate";
import UserEditForm from "./pages/users/UserEdit";
import Roles from "./pages/roles";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} Component={Dashboard} />
          <Route path={"/users"} Component={Users} />
          <Route path={"/register"} Component={Register} />
          <Route path={"/login"} Component={LoginForm} />
          <Route path={"/create-user"} Component={CreateUserForm} />
          <Route path={"/users/:id/edit"} Component={UserEditForm} />
          <Route path={"/roles"} Component={Roles} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
