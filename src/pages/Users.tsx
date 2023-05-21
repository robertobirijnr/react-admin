import axios from "axios";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { User } from "../models/user";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`users?page=${page}`);
        setUsers(data.data);
        setLastPage(data.meta.last_page);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, [page]);

  const next = () => {
    if (page <= lastPage) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record")) {
      await axios.delete(`users/${id}`);

      setUsers(users.filter((user: User) => user.id !== id));
    }
  };

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/create-user" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
      </div>

      <h2>Section title</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name}
                    {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role?.name}</td>

                  <td>
                    <div className="btn-group mr-2">
                      <a
                        onClick={() => del(user.id)}
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
                        to={`/users/${user.id}/edit`}
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

export default Users;
