import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [form, setState] = useState({
    username: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const printValues = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post("login", {
      email: form.username,
      password: form.password,
    });
    if (response.status === 200) {
      setRedirect(true);
      console.log(response);
    }
  };

  const updateField = (e: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <main className=" container pt-5">
      <div className="row pt-5 flex justify-content-center">
        <div className="col-md-6">
          <form onSubmit={printValues}>
            <div className="form-group mb-3">
              <label>Username:</label>
              <input
                value={form.username}
                name="username"
                onChange={updateField}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                value={form.password}
                name="password"
                type="password"
                className="form-control"
                onChange={updateField}
              />
            </div>
            <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
