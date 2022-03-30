/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';

function Category() {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [id, setId] = useState(null);
  const toggle = () => setModal(!modal);
  const getCategories = () => {
    axios
      .get('/categoriesmysql')
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  const addCategory = (event) => {
    event.preventDefault();
    const categoryObj = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios.post('/categoriesmysql', categoryObj).then((res) => {
      getCategories();
      console.log(res.data);
    });
  };
  const updateCategory = () => {
    axios
      .put(`/categoriesmysql/${id}`, {
        category_id: id,
        name: name,
        description: description,
      })
      .then((res) => {
        console.log(res.data);
        getCategories();
      });
  };
  const deleteCategory = (id) => {
    axios.delete(`/categoriesmysql/${id}`).then((res) => {
      console.log(res.data);
      getCategories();
    });
  };
  const deleteAll = () => {
    axios.delete('/categoriesmysql').then((res) => {
      console.log(res.data);
      getCategories();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Category</h1>
        <form onSubmit={addCategory}>
          <input
            type="text"
            name="name"
            placeholder="Enter Category Name"
            className="form-control my-2"
          />
          <textarea
            name="description"
            className="form-control my-2"
            cols="30"
            rows="10"
            placeholder="Enter Category description"
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
      <div className="text-center my-2">
        <h1>Categories List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Categories
        </button>
        <table>
          <thead>
            <tr>
              <th>CategoryId</th>
              <th>CategoryName</th>
              <th>Description</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((val) => (
              <tr>
                <td>{val.category_id}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>
                  <button type="button" onClick={toggle}>
                    Update
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteCategory(val.category_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{timeout: 1000}}>
        <ModalBody>
          <h1 className="text-center">Update Dish</h1>
          <div>
            <input
              type="number"
              name="categoryid"
              placeholder="Enter Category Id you want to update"
              className="form-control"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <input
              type="text"
              name="updateName"
              className="form-control my-3"
              placeholder="Enter Category Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              name="updatedesc"
              className="form-control my-3"
              placeholder="Enter Category Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-info"
            onClick={updateCategory}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Category;
