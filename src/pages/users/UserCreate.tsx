import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Role } from "../../models/role";
import { Navigate } from "react-router-dom";

const CreateUserForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRoleId] = useState("");
  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    };

    getRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      first_name: payload.firstname,
      last_name: payload.lastname,
      email: payload.email,
      role_id: role,
    };

    const response = await axios.post("user/create", formData, {
      withCredentials: true,
    });

    if (response.status === 201) {
      setRedirect(true);
    }

    console.log(response);
  };

  const updateField = (e: React.FormEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const selectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value: string = e.currentTarget.value;
    setRoleId(value);
  };

  if (redirect) return <Navigate to="/users" />;
  return (
    <Layout>
      <div className="container pt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="">First Name</label>
                <input
                  name="firstname"
                  value={payload.firstname}
                  onChange={updateField}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="last Name">Last Name</label>
                <input
                  name="lastname"
                  value={payload.lastname}
                  onChange={updateField}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Last name">Email</label>
                <input
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={updateField}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Role">Role</label>
                <select
                  className="form-control"
                  onChange={selectChange}
                  name="roles"
                  id=""
                >
                  {roles.map((role: Role) => {
                    return (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* <input
                  type="text"
                  name="role"
                  value={payload.role}
                  onChange={updateField}
                  className="form-control"
                />
              </div> */}

              <button type="submit" className="btn btn-outline-secondary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUserForm;
