import React, { useEffect, useState } from "react";
import { Shopcontext } from "../context/ShopContext";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";


const Loging = () => {
  const [currentState, setCurrentState] = useState("Loging");
  const { token, setToken, navigate, backendUrl } = useContext(Shopcontext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");



  const onSunmitHadller = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign up') {

        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
         
        } else {
          toast.error(error.message)
        }


      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (response.data.success) {
          console.log(response.data)
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          
        }
        else {
          toast.error(error.message)
        }
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }
    , [token])

  return (
    <form onSubmit={onSunmitHadller} className="flex flex-col w-[90%] items-center sm:max-w-96 m-auto mt-14 gap-4">
      <div className="inline-flex items-center gap-2 mb-2 mt-10 text-gray-800">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none mt-3 h-[1.6px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Loging' ? '' : <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px">

        <p className="cursor-pointer "> Forrgot your password</p>
        {
          currentState === 'Loging'
            ? <p className="cursor-pointer" onClick={() => setCurrentState('Sign up')}> Create account</p>
            : <p className="cursor-pointer" onClick={() => setCurrentState('Loging')}> Login Here</p>
        }
      </div>


      <button
        type="submit"
        className="px-8 mt-4 py-2 bg-black text-white font-light hover:bg-gray-700"
      >
        {currentState === 'Loging' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Loging;
