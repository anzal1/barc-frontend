import React, { useState } from 'react'
import { useCreateJWTMutation, useLoginUserMutation } from '../Api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { userState } from '../Atoms/user'

export const Login = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  })
  const setUserState = useSetRecoilState(userState)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: createJWTFn, isPending: isCreateJWTPending } =
    useCreateJWTMutation()
  const { mutate: loginUserFn, isPending: isLoginUserPending } =
    useLoginUserMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const loginData = {
      User_Name: formValues.username,
      Password: formValues.password
    }
    loginUserFn(loginData, {
      onSuccess(data: any) {
        if (data > 0) {
          createJWTFn(loginData, {
            onSuccess(data: any) {
              localStorage.setItem('userToken', data?.token)
              localStorage.setItem('user', JSON.stringify(data))
              setUserState((prev) => {
                return {
                  ...prev,
                  name: data?.username,
                  email: data?.name,
                  token: data?.token
                }
              })
              toast.success('User logged in successfully!')
              navigate('/')
            },
            onError(error: any) {
              toast.error('An error occured!')
              console.log(error.message)
            }
          })
        } else {
          toast.error('User not found!')
        }
      },
      onError(error: any) {
        toast.error('An error occured!')
        console.log(error)
      }
    })
  }

  if (isCreateJWTPending || isLoginUserPending) return <div>Loading...</div>

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
          onClick={handleSubmit}
          className="w-80 h-12  mt-4 bg-blue-600 text-white rounded-lg focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  )
}
