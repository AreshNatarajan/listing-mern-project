// src/GroceryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
// import { json } from 'react-router-dom';

function GroceryList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [message, setMessage] = useState('')
  const [Remaining, setRemaining] = useState([])

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setRemaining(items.filter(item => !item.bought));
  }, [items]);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
    setItems(response.data);

  };


  const addItem = async () => {
    try {
      if (newItem) {
        const response = await axios.post('http://localhost:5000/items', { name: newItem });
        setItems([...items, response.data]);
        let msg = JSON.stringify(response.data.name);
        setNewItem('')
        setMessage(`${JSON.parse(msg)} added`)
        setTimeout(() => {
          setMessage('')
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
    }

  };

  const toggleBought = async (id, bought) => {
    const response = await axios.put(`http://localhost:5000/items/${id}`, { bought: !bought });

    setItems(items.map(item => item._id === id ? response.data : item));
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    setItems(items.filter(item => item._id !== id));
    setMessage('Deleted')
    setTimeout(() => {
      setMessage('')
    }, 500);
  };

  return (
    <div>
      <h1>Grocery List app</h1>
      <div className="details">
        <div className="col">
          <span>Total</span>
          <span>{items.length}</span>
        </div>
        <div className="col">
          <span>Remaining</span>
          <span>{Remaining.length}</span>
        </div>
        <div className="col">
          <span>Finished</span>
          <span>{items.length - Remaining.length}</span>
        </div>
      </div>
      <div className="btn-group">
        <input className='input-item'
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder='Type...'
        />
        <button className='add-btn' onClick={addItem}><FaPlus fill='black' /></button>
      </div>

      <h3 className='message' >{message}</h3>
      <ul className='unorder-list' >
        {items.map((item, index) => (
          <li key={item._id}>
            <div className="content">
              <h5>{`${index + 1}.`}</h5>
              <h5>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h5>
            </div>
            <div className="btn">
              <button onClick={() => toggleBought(item._id, item.bought)}>
                {item.bought ? <FaCheckSquare fill='green' /> : <FaRegCheckSquare fill=' #B6BBC4' />}
              </button>
              <button onClick={() => deleteItem(item._id)}><FaTrash fill='red' /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
