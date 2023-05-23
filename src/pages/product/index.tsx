import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Product as Prod } from "../../models/product";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.meta.last_page);

      console.log(data);
    };
    getProducts();
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
      await axios.delete(`products/${id}`);

      setProducts(products.filter((prod: Prod) => prod.id !== id));
    }
  };
  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/create-product" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Products</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod: Prod) => {
              return (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>
                    <img src={prod.image} width="50" alt="" />
                  </td>
                  <td>{prod.title}</td>
                  <td>{prod.description}</td>
                  <td>{prod.price}</td>

                  <td>
                    <div className="btn-group mr-2">
                      <a
                        onClick={() => del(prod.id)}
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
                        to={`/roles/${prod.id}/edit`}
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

export default Product;
