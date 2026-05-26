

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12'>
        <form onSubmit={handleLogin} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm mx-auto'>
          <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>Walmart</h2>
          </div>
          <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋</h2>
          <p className='text-center mb-6'>Enter your username and password to login</p>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded' placeholder='Enter your email address' required />
          </div>

          <div className='mb-4'>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded' placeholder='Enter your password' required />
          </div>

          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
            Sign In
          </button>

          <div className="flex space-x-2 mt-4">
            <button type="button" onClick={() => {setEmail("admin@example.com"); setPassword("admin123");}} className="w-1/2 bg-gray-200 text-black text-sm font-medium p-2 rounded hover:bg-gray-300 transition">
              Admin Fill
            </button>
            <button type="button" onClick={() => {setEmail("customer@example.com"); setPassword("customer123");}} className="w-1/2 bg-gray-200 text-black text-sm font-medium p-2 rounded hover:bg-gray-300 transition">
              Customer Fill
            </button>
          </div>

          <p className='mt-6 text-center text-sm'>
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-[52%] pt-10 pr-10">
        <img
          src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?q=80&w=762&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Login Illustration"
          className="rounded-xl object-cover h-[750px] w-full"
        />
      </div>
    </div>
  );
};

export default Login;
