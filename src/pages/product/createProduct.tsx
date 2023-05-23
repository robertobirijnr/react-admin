import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CreateProduct = () => {
  const [redirect, setRedirect] = useState(false);
  const [description, setDescription] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: payload.name,
      description: description,
      price: payload.price,
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

  if (redirect) return <Navigate to="/products" />;
  return (
    <Layout>
      <div className="container pt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="">Name</label>
                <input
                  name="name"
                  value={payload.name}
                  onChange={updateField}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="last Name">Description</label>
                <textarea
                  name="description"
                  value={payload.description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="Last name">Price</label>
                <input
                  type="text"
                  name="price"
                  value={payload.price}
                  onChange={updateField}
                  className="form-control"
                />
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

export default CreateProduct;
