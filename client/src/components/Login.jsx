import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import toast from "react-hot-toast";
import { backendRoot } from "./constants";

const Login = () => {
  const [register, setRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async(e) => {
    e.preventDefault();
    if(register){
      try {
        if(password !== confirmPassword) {
          toast.error("Password mismatch detected");
          return;
        };
      const res = await axios.post(`${backendRoot}/api/v1/user/register`,{
        username, email, password
      })
      console.log(res.response)
      if(!res.data.success){
        toast.error("Failed To Create User.")
      }
      toast.success(`User ${username} created successfully!!!`)
      } catch (error) {
        if(!error.response.data.success){
          toast.error(error.response.data.message)
        }
      }
    }else{
      try {
      const res = await axios.post(`${backendRoot}/api/v1/user/login`,{
        email, password
      },{
        withCredentials: true
      })
      if(!res.data.success){
        toast.error("Failed To Login.")
      }
      toast.success(`Logged In successfully!!!`)
      setTimeout(() => {
        navigate("/home/dashboard")
      },2000)
      
      } catch (error) {
        console.log(error)
      }
    }

    
  };

  return (
    <div className="bg-linear-khata h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-[90%] max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="font-semibold text-3xl mb-6">
          {register ? "Register" : "Login"}
        </h1>
        <form onSubmit={submitHandler} className="w-full space-y-4">
          {register && (
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="outline-none border-2 border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="outline-none border-2 border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="outline-none border-2 border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          {register && (
            <div className="flex flex-col">
              <label
                htmlFor="verifypassword"
                className="text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="verifypassword"
                type="password"
                className="outline-none border-2 border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-6 bg-red-500 text-white rounded-md py-2 font-semibold hover:bg-red-600 transition duration-200"
          >
            {register ? "Register" : "Login"}
          </button>
          <div className="text-center">
            {register ? (
              <p>
                Already have an accocunt?
                <span
                  className="cursor-pointer underline text-blue-400 font-semibold"
                  onClick={() => setRegister(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an accocunt?
                <span
                  className="cursor-pointer underline text-blue-400 font-semibold"
                  onClick={() => setRegister(true)}
                >
                  Register
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
