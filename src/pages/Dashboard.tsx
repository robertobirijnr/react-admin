import axios from "axios";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { User } from "../models/user";

const Dashboard = () => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("user");

      setUser(data);
    };

    getUser();
  }, []);
  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          Welcome {user.first_name} {user.first_name}
        </h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
