import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const LoginPopUp = ({ setShowLogin }) => {
    const { setToken } = useContext(StoreContext);
    const url = import.meta.env.VITE_API_URL;
    const [currState, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const switchState = (newState) => {
        setCurrState(newState);
        setData({ name: "", email: "", password: "" }); // Reset data
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newURL = `${url}/api/user/${currState === 'Sign Up' ? 'register' : 'login'}`;

        try {
            const response = await axios.post(newURL, data);
            const { success, message, token } = response.data;

            if (success) {
                toast.success(message);
                if (token) {
                    localStorage.setItem('token', token);
                    setShowLogin(false);
                    setToken(token);
                }
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className='login-popup'>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2 className="m-0">{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" className="close-icon" style={{ cursor: 'pointer' }} />
                </div>

                <form className="card-body" onSubmit={handleSubmit}>
                    {currState === "Sign Up" &&
                        <input name='name' type="text" className="form-control mb-3" placeholder='Your name'
                            value={data.name}
                            onChange={handleChange}
                            required />
                    }

                    <input name='email' type="email" className="form-control mb-3" placeholder='Your email'
                        value={data.email}
                        onChange={handleChange}
                        required />

                    <input name='password' type="password" className="form-control mb-3" placeholder='Password'
                        value={data.password}
                        onChange={handleChange}
                        required />

                    <button type="submit" className="btn btn-primary btn-block">
                        {currState === "Login" ? "Login" : "Create account"}
                    </button>

                    <div className="card-footer">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id='check-box' required />
                            <label className="form-check-label" htmlFor='check-box' style={{ cursor: 'pointer' }}>By continuing, I agree to the terms of use & privacy policy.</label>
                        </div>

                        {currState === "Login"
                            ? <p>Create a new account? <span onClick={() => switchState('Sign Up')} className="text-danger" style={{ cursor: 'pointer' }}>Click here</span></p>
                            : <p>Already have an account? <span onClick={() => switchState('Login')} className="text-danger" style={{ cursor: 'pointer' }}>Login here</span></p>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPopUp;
