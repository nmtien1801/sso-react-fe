import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerNewUser } from '../../service/authService';
import { useNavigate } from "react-router";

const RegisterPage = () => {
    let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
    address: '',
    sex: '',
    phone: '',
    groupID: '',
    image: '',
    roleID: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let res = await registerNewUser(formData);
    if(res.EC === 0){
        navigate("/");
    }else{
        alert(res.EM);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sex" className="form-label">
            Sex:
          </label>
          <select
            className="form-control"
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="groupID" className="form-label">
            Group ID:
          </label>
          <input
            type="number"
            className="form-control"
            id="groupID"
            name="groupID"
            value={formData.groupID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roleID" className="form-label">
            Role ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="roleID"
            name="roleID"
            value={formData.roleID}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
