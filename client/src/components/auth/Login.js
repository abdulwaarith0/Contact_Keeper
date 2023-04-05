import React, { useState } from 'react';

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const { email, password } = login;

    const onChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted");
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email"><strong>Email:
                    </strong></label>
                    <input type="email" name="email"
                        value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><strong>Password:
                    </strong></label>
                    <input type="password" name="password"
                        value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login"
                    className="btn btn-primary btn-block"
                    style={{
                        borderRadius: "1rem"
                    }} />
            </form>
        </div>
    )
};


export default Login;
