import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Regiser";
import LoginForm from "./pages/Login";
import CreateUserForm from "./pages/users/UserCreate";
import UserEditForm from "./pages/users/UserEdit";
import Roles from "./pages/roles";
import CreateRoleForm from "./pages/roles/createRole";
import RoleEditForm from "./pages/roles/RoleEdit";

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
          <Route path={"/create-role"} Component={CreateRoleForm} />
          <Route path={"/roles/:id/edit"} Component={RoleEditForm} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
