import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Role } from "../../models/role";
import { Navigate, useParams } from "react-router-dom";

// type UserParams = {
//   id: string;
// };

const UserEditForm = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRoleId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getRoles = async () => {
      const roles = await axios.get("roles");
      setRoles(roles.data);

      const { data } = await axios.get(`users/${id}`);
      setFirstname(data.first_name);
      setLastname(data.last_name);
      setEmail(data.email);
      setRoleId(data.role?.id);
    };

    getRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id: id,
      first_name: firstname,
      last_name: lastname,
      email: email,
      role_id: role,
    };

    try {
      const response = await axios.put(`users/${id}`, formData, {
        withCredentials: true,
      });

      if (response) {
        setRedirect(true);
      }
    } catch (err: any) {
      console.log(err.response.data);
    }
    // console.log(response);
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
                  defaultValue={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="last Name">Last Name</label>
                <input
                  name="lastname"
                  defaultValue={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Last name">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Role">Role</label>
                <select
                  value={role}
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

export default UserEditForm;
