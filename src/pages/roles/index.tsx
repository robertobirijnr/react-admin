import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
      console.log(data);
    };

    getRoles();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record")) {
      await axios.delete(`roles/${id}`);

      setRoles(roles.filter((role: Role) => role.id !== id));
    }
  };

  const prev = () => {};

  const next = () => {};

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/create-user" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Roles</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>

                  <td>
                    <div className="btn-group mr-2">
                      <a
                        onClick={() => del(role.id)}
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Delete
                      </a>
                    </div>
                  </td>

                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/roles/${role.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" onClick={prev} className="page-link">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a onClick={next} href="#" className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default Roles;
