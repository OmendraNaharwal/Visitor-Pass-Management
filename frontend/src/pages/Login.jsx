// login page

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({

        email: "",
        password: "",

    });

    const [loading, setLoading] = useState(false);

    // input change
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    // login user
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            toast.error("Please fill all fields");

            return;

        }

        try {

            setLoading(true);

            const res = await API.post("/auth/login", formData);

            login(res.data.data, res.data.token);

            toast.success("Login successful");

            navigate("/dashboard");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            {/* left side */}

            <div className="login-left">

                <div className="overlay">

                    <h1>Visitor Pass Management</h1>

                    <p>

                        Manage visitors, appointments and digital visitor
                        passes from one place.

                    </p>

                </div>

            </div>

            {/* right side */}

            <div className="login-right">

                <div className="login-box">

                    <h2>Welcome Back</h2>

                    <p>

                        Login to continue

                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-box">

                            <label>Email</label>

                            <input

                                type="email"

                                name="email"

                                placeholder="Enter your email"

                                value={formData.email}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="input-box">

                            <label>Password</label>

                            <input

                                type="password"

                                name="password"

                                placeholder="Enter password"

                                value={formData.password}

                                onChange={handleChange}

                            />

                        </div>

                        <button

                            type="submit"

                            className="login-btn"

                        >

                            {

                                loading ?

                                "Please wait..." :

                                "Login"

                            }

                        </button>

                    </form>

                    <p className="bottom-text">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;