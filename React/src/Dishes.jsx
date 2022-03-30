/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [categorydata, setCategorydata] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(null);
  const [price, setPrice] = useState(null);
  const toggle = () => setModal(!modal);
  const getDish = () => {
    axios
      .get('/dishesmysql')
      .then((res) => {
        setDishes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get('/categoriesmysql')
      .then((response) => {
        console.log('Category Data', response.data.results);
        setCategorydata(response.data.results);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
    getDish();
  }, []);
  const addDish = (event) => {
    event.preventDefault();
    console.log(event.target.category.value);
    const authorObj = {
      name: event.target.name.value,
      description: event.target.description.value,
      categories_id: event.target.category.value,
      price: event.target.price.value,
    };
    axios.post('/dishesmysql', authorObj).then((res) => {
      getDish();
      console.log(res.data);
    });
  };
  const updateDish = () => {
    axios
      .put(`/dishesmysql/${id}`, {
        dish_id: id,
        name: name,
        description: description,
        categories_id: category,
        price: price,
      })
      .then((res) => {
        console.log(res.data);
        getDish();
      });
  };
  const deleteDish = (dishId) => {
    axios.delete(`/dishesmysql/${dishId}`).then((res) => {
      console.log(res.data);
      getDish();
    });
  };
  const deleteAll = () => {
    axios.delete('/dishesmysql').then((res) => {
      console.log(res.data);
      getDish();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Dish</h1>
        <form onSubmit={addDish}>
          <input
            type="text"
            name="name"
            placeholder="Enter Dish Name"
            className="form-control my-2"
          />
          <textarea
            name="description"
            className="form-control my-2"
            cols="30"
            rows="10"
            placeholder="Enter Dish description"
          />
          <select name="category" id="category" className="form-control my-2">
            {categorydata.map((value) => {
              return <option value={value.category_id}>{value.name}</option>;
            })}
          </select>
          <input
            type="number"
            name="price"
            className="form-control my-2"
            placeholder="Enter Dish Price"
          />
          <button type="submit">Add Dish</button>
        </form>
      </div>
      <div className="text-center my-2">
        <h1>Dishes List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Dishes
        </button>
        <table>
          <thead>
            <tr>
              <th>DishId</th>
              <th>DishName</th>
              <th>Description</th>
              <th>Price</th>
              <th>CategoryId</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((val) => (
              <tr>
                <td>{val.dish_id}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>{val.price}</td>
                <td>{val.categories_id}</td>
                <td>
                  <button type="button" onClick={toggle}>
                    Update
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteDish(val.dish_id)}>
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
              name="dishid"
              placeholder="Enter Dish Id"
              className="form-control"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <input
              type="text"
              name="updateName"
              className="form-control my-3"
              placeholder="Enter Dish Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              name="updatedesc"
              className="form-control my-3"
              placeholder="Enter Dish Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <select
              name="updatecategory"
              className="form-control my-2"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categorydata.map((value) => {
                return <option value={value.category_id}>{value.name}</option>;
              })}
            </select>
            <input
              type="number"
              name="updatePrice"
              placeholder="Enter Price"
              className="form-control my-3"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-info" onClick={updateDish}>
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Dishes;
