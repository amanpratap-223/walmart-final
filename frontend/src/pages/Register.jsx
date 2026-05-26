// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmittedData({ name, email, password });
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-screen">
      
//       {/* Left: Register Form */}
//       <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12'>
//         <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm mx-auto'>
//           {/* Logo */}
//           <div className='flex justify-center mb-6'>
//             <h2 className='text-xl font-medium'>Walmart</h2>
//           </div>

//           {/* Title */}
//           <h2 className='text-2xl font-bold text-center mb-6'>Create Account 👤</h2>
//           <p className='text-center mb-6'>Fill in the details to register</p>

//           {/* Name Input */}
//           <div className='mb-4'>
//             <label className='block text-sm font-semibold mb-2'>Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className='w-full p-2 border rounded'
//               placeholder='Enter your name'
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div className='mb-4'>
//             <label className='block text-sm font-semibold mb-2'>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className='w-full p-2 border rounded'
//               placeholder='Enter your email'
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div className='mb-4'>
//             <label className='block text-sm font-semibold mb-2'>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className='w-full p-2 border rounded'
//               placeholder='Enter your password'
//               required
//             />
//           </div>

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
//           >
//             Sign Up
//           </button>

//           {/* Login Link */}
//           <p className='mt-6 text-center text-sm'>
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>

//         {/* Display Submitted Data */}
//         {submittedData && (
//           <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-md mx-auto">
//             <p className="font-semibold mb-2">✅ User Registered:</p>
//             <p><strong>Name:</strong> {submittedData.name}</p>
//             <p><strong>Email:</strong> {submittedData.email}</p>
//             <p><strong>Password:</strong> {submittedData.password}</p>
//           </div>
//         )}
//       </div>

//       {/* Right: Image Section */}
//       <div className="hidden md:block w-[52%] pt-10 pr-10">
//         <img
//           src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?q=80&w=762&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Register Illustration"
//           className="rounded-xl object-cover h-[750px] w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`User Registered: { ${name}, ${email}, ${password} }`);
//     // Optionally, clear inputs after registration
//     setName("");
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-screen">
      
//       {/* Left: Register Form */}
//       <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12'>
//         <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm mx-auto'>
//           {/* Logo */}
//           <div className='flex justify-center mb-6'>
//             <h2 className='text-xl font-medium'>Walmart</h2>
//           </div>

//           {/* Title */}
//           <h2 className='text-2xl font-bold text-center mb-6'>Create Account 👤</h2>
//           <p className='text-center mb-6'>Fill in the details to register</p>

//           {/* Name Input */}
//           <div className='mb-4'>
//             <label className='block text-sm font-semibold mb-2'>Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className='w-full p-2 border rounded'
//               placeholder='Enter your name'
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div className='mb-4'>
//             <label className='block text-sm font-semibold mb-2'>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className='w-full p-2 border rounded'
//               placeholder='Enter your email'
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div className='mb-4'>
//             <label className='block text-sm font-semibold mb-2'>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className='w-full p-2 border rounded'
//               placeholder='Enter your password'
//               required
//             />
//           </div>

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
//           >
//             Sign Up
//           </button>

//           {/* Login Link */}
//           <p className='mt-6 text-center text-sm'>
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>

//       {/* Right: Image Section */}
//       <div className="hidden md:block w-[52%] pt-10 pr-10">
//         <img
//           src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?q=80&w=762&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Register Illustration"
//           className="rounded-xl object-cover h-[750px] w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm mx-auto'>
          <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>Walmart</h2>
          </div>
          <h2 className='text-2xl font-bold text-center mb-6'>Create Account 👤</h2>
          <p className='text-center mb-6'>Fill in the details to register</p>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded' placeholder='Enter your name' required />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded' placeholder='Enter your email' required />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded' placeholder='Enter your password' required />
          </div>

          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
            Sign Up
          </button>

          <p className='mt-6 text-center text-sm'>
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-[52%] pt-10 pr-10">
        <img
          src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?q=80&w=762&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Register Illustration"
          className="rounded-xl object-cover h-[750px] w-full"
        />
      </div>
    </div>
  );
};

export default Register;
