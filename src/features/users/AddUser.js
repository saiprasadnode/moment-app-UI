import React, { useState } from 'react';
import { useAddUserMutation } from './userApi';
import './AddUser.css'; 
import logo from '../../app/assets/5DLogo.png';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const nav=useNavigate()
    const [addUser] = useAddUserMutation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        city: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await addUser(formData); 
            setFormData({            
                firstName: '',
                lastName: '',
                mobile: '',
                email: '',
                city: '',
                password: ''
            });
            nav('moment');           
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
    
    return (
        <div className="container">
            <div className="header">
                <img src={logo} alt="Logo" className="logo" />
            </div>


            <div style={{ background: "white", height: "77vh", marginTop: "-30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "75%" }}>
                    <h2 style={{ textAlign: "center" }}><strong>Sign Up</strong></h2>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-left">
                            <label>
                                First Name
                                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                            </label>
                            <label>
                                Mobile No.
                                <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No." />
                            </label>
                            <label>
                                City
                                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                            </label>
                        </div>

                        <div className="form-right">
                            <label>
                                Last Name
                                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                            </label>
                            <label>
                                Email-ID
                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email-ID" />
                            </label>
                            <label>
                                Enter Password
                                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                            </label>
                        </div>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
