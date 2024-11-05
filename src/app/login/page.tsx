"use client"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import  "./login.module.css";
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://interview.bigyellowfish.io/api/User/authenticate', {
                username,
                password,
            });
            
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                router.push('/byfdashboard'); 
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    return (
        <div className="container-fluid ">

        <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">BYF </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Analytics login </a>
                    </li>

                </ul>
             
            </div>
            </div>
        </nav>
        </div> 
            <div className="row ">
                <div className="col-6 mx-auto py-4">
                <h1>Login</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form  className="form-control login-form p-4 br-0" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-submit w-100">Login</button>
                    </form>
                </div>
            </div>
  
        </div>
    );
};

export default LoginPage;
