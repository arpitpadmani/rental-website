import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAuth } from '../redux/auth';

const Login = () => {

  const navigate = useNavigate();
  const URL = "http://localhost:5000/api/auth/login";
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { storetokenInLS } = useAuth();



  function ChangeHandler(event) {
    setUser((prev) => (
      {
        ...prev, [event.target.name]: event.target.value
      }
    ))
  }

  const [ShowPassword, setShowPassword] = useState(false);
  const handleLogin = async (e, req, res) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        storetokenInLS(res_data.token);
        window.location.reload();
        if (res_data.redirected) {
          navigate(res_data.redirected);
        } else {
          console.log("error in redirection");
        }
      } else {
        alert(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }

      console.log(response);
    } catch (error) {
      console.log("login me error hee " + error);
    }
  };

  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-lg shadow-md w-6/12 h-4/6">

        <div className='bg-black pt-32 rounded-lg text-center align-center w-3/6'>
          <p className='text-white text-5xl text-center mb-7'>Hello, Friend!</p>
          <p className='text-white text-lg text-center'>Enter your personal detail and</p>
          <p className='text-white text-lg text-center mb-10'>start journy with us</p>

          <Link to="/signup" className="border rounded-lg text-white py-2 px-5 m-2 hover:bg-gray-800">Sign Up</Link>
        </div>

        <div className='w-3/6 px-2 align-center justify-center'>
          <h2 className="text-4xl mt-[75px] text-center font-bold">Login</h2>
          <form onSubmit={handleLogin} className='p-10'>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border rounded-md py-2 px-3 mt-1"
                placeholder="Your email"
                value={user.email}
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className="mb-8 relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type={ShowPassword ? ("text") : ("password")}
                id="password"
                name="password"
                className="w-full border rounded-md py-2 px-3 mt-1"
                placeholder="Your password"
                value={user.password}
                onChange={ChangeHandler}
                required
              />
              <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                {
                  ShowPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#afb2bf' />) : (<AiOutlineEye fontSize={24} fill='#afb2bf' />)
                }
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Sign In
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;