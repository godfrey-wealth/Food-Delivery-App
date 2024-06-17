import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({FOOD_LIST_URL}) => {
  
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FetchList = async () => {
    try {
      const response = await axios.get(`${FOOD_LIST_URL}/api/food/list`);
      console.log('API Response:', response.data);
      if (response.data.success) {
        setList(response.data.food); // Accessing 'food' instead of 'data'
      } else {
        toast.error("Error: Data fetch was unsuccessful");
        setError("Error: Data fetch was unsuccessful");
      }
    } catch (error) {
      toast.error("Error fetching the list");
      console.error("Error fetching the list:", error);
      setError("Error fetching the list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchList();
  }, []);

  const RemoveFoodBYID = async (id) => {
    try {
      const response = await axios.delete(`${FOOD_LIST_URL}/api/food/delete/${id}`);
      console.log('API Response:', response.data);
      await FetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error: Data fetch was unsuccessful");
        setError("Error: Data fetch was unsuccessful");
      }
    } catch (error) {
      toast.error("Error fetching the list");
      console.error("Error fetching the list:", error);
      setError("Error fetching the list");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='list add flex-col'>
      <p>All Food Item List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : list && list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${FOOD_LIST_URL}/images/`+ item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>€{item.price}</p>
              <button onClick={() => RemoveFoodBYID(item._id)} className='btn btn-danger'>Delete</button>
            </div>
          ))
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </div>
  );
}

export default List;
