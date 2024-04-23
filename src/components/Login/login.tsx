import React, { useState } from 'react'

export const Login = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex flex-col items-center px-4 justify-center w-96 h-[591px] bg-[#1C9FF6] rounded-xl  bg-opacity-50 bg-clip-padding backdrop-filter-none bg-filter shadow-black shadow-xl  ">
      <h1 className="text-4xl font-semibold text-gray-800">Login</h1>
      <form className="flex flex-col items-center justify-center w-96 h-96">
        <label className="text-gray-800 text-left w-80 mt-4 ml-2">
          Login Id
        </label>
        <input
          value={formValues.username}
          name="username"
          onChange={handleChange}
          type="text"
          placeholder=""
          className="w-80 h-12  mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <label className="text-gray-800 text-left w-80 mt-4 ml-2">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            value={formValues?.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            placeholder=""
            className="w-80 h-12 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <img
            onClick={() => setShowPassword(!showPassword)}
            src="/assets/eye.svg"
            className="w-6 h-6  absolute top-5 right-2 cursor-pointer"
            alt="eye"
          />
        </div>

        <button
          type="submit"
          className="w-80 h-12  mt-4 bg-blue-600 text-white rounded-lg focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  )
}
