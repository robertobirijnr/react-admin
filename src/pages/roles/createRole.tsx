import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Role } from "../../models/role";
import { Navigate } from "react-router-dom";
import { Permission } from "../../models/permission";

const CreateRoleForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [name, setName] = useState("");

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await axios.get("permissions");
      setPermissions(data);
    };

    getRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      permissions: selected,
    };

    // console.log(formData);

    const response = await axios.post("roles", formData, {
      withCredentials: true,
    });

    if (response.status === 201) {
      setRedirect(true);
    }

    console.log(response);
  };

  const check = (id: number) => {
    //check if value exist in the array
    if (selected.some((s) => s === id)) {
      //if it exist remove it
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  if (redirect) return <Navigate to="/roles" />;
  return (
    <Layout>
      <div className="container pt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="">Name</label>
                <input
                  name="firstname"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3 row">
                <label htmlFor="Role">Role</label>
                <div className="col-sm-10">
                  {permissions.map((p: Permission) => {
                    return (
                      <div
                        className="form-check form-check-line col-3"
                        key={p.id}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value={p.id}
                          onChange={() => check(p.id)}
                        />
                        <label htmlFor="form-check-lable">{p.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

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

export default CreateRoleForm;
