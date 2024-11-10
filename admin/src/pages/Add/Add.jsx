// Import necessary libraries
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';

const Add = () => {
  const url=import.meta.env.VITE_API_URL;
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  // Ref for file input to reset it after submission
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'image') {
      // Handle file input
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      // Handle text inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object for sending data
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      // Send POST request to add product
      const response = await axios.post(`${url}/api/food/add`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Show success message
      toast.success("Product added successfully!");

      // Reset form fields after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
      });
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      // Show error message based on server response
      if (error.response && error.response.status === 400 && error.response.data.message) {
        toast.error(error.response.data.message); // Server validation error
      } else {
        toast.error('Error submitting form. Please try again.'); // General error message
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Price and Category */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Price</label>
            <input 
              type="number" 
              className="form-control" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="category" className="form-label">Category</label>
            <select 
              className="form-select" 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select a category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input 
            type="file" 
            className="form-control" 
            id="image" 
            name="image" 
            accept="image/*" 
            onChange={handleChange} 
            ref={fileInputRef} 
            required 
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
