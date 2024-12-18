import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { register, error, clearErrors } = authContext;

    useEffect(() => {
        if (error === "User already exists") {
            setAlert(error, "danger");
            clearErrors();
        }
    }, [clearErrors, error, setAlert]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("Please enter all fields !!!!", "danger");
        } else if (password !== password2) {
            setAlert("Password do not match !!!!", "danger");
        } else {
            register({
                name,
                email,
                password
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name"><strong>Name:
                    </strong></label>
                    <input type="text" name="name"
                        value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email"><strong>Email:
                    </strong></label>
                    <input type="email" name="email"
                        value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><strong>Password:
                    </strong></label>
                    <input type="password" name="password"
                        value={password} onChange={onChange} 
                        required minLength="6" />
                </div>
                <div className="form-group">
                    <label htmlFor="password2"><strong>Confirm Password:
                    </strong> </label>
                    <input type="password" name="password2"
                        value={password2} onChange={onChange} 
                        required minLength="6" />
                </div>
                <input type="submit" value="Register"
                    className="btn btn-primary btn-block"
                    style={{
                        borderRadius: "1rem"
                    }} />
            </form>
        </div>
    )
};


export default Register;
