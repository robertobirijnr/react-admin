import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Regiser";
import LoginForm from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} Component={Dashboard} />
          <Route path={"/users"} Component={Users} />
          <Route path={"/register"} Component={Register} />
          <Route path={"/login"} Component={LoginForm} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
