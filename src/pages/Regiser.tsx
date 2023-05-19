import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [form, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const printValues = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("register", {
      first_name: form.firstname,
      last_name: form.lastname,
      email: form.email,
      password: form.password,
      password_confirm: form.confirm_password,
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

  if (redirect) return <Navigate to="/login" />;

  return (
    <main className=" container pt-5">
      <div className="row pt-5 flex justify-content-center">
        <div className="col-md-6">
          <form onSubmit={printValues}>
            <div className="form-group mb-3">
              <label>First Name:</label>
              <input
                value={form.firstname}
                name="firstname"
                onChange={updateField}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label>Last Name:</label>
              <input
                value={form.lastname}
                name="lastname"
                onChange={updateField}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                value={form.email}
                name="email"
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

            <div className="form-group">
              <label>Password:</label>
              <input
                value={form.confirm_password}
                name="confirm_password"
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

export default Register;
