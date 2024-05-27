import React, { useState } from 'react'
import { useCreateJWTMutation, useLoginUserMutation } from '../Api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { userState } from '../Atoms/user'

import eye from '../../assets/eye.svg'

export const Login = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' })
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
              toast.success(`Welcome ${data?.username}!`)
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
    <div className="flex flex-col items-center px-4 justify-between py-12 w-[25%] mt-6 md:mt-0 h-[80%] bg-[#1C9FF6] rounded-xl bg-opacity-50 bg-clip-padding backdrop-filter-none bg-filter shadow-black shadow-xl">
      <h1 className="text-4xl font-semibold text-gray-800">Login</h1>
      <form className="flex flex-col items-center justify-between h-[70%] w-full">
        <div className="flex flex-col w-full px-2">
          <label className="text-gray-800 text-left mt-4 ml-2">Login Id</label>
          <input
            value={formValues.username}
            name="username"
            onChange={handleChange}
            type="text"
            placeholder=""
            className="h-12  mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <label className="text-gray-800 text-left  mt-4 ml-2">Password</label>
          <div className="relative w-full">
            <input
              name="password"
              value={formValues?.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder=""
              className=" h-12 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={eye}
              className="w-6 h-6  absolute top-5 right-2 cursor-pointer"
              alt="eye"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className=" h-12 w-full mt-4 bg-blue-600 text-white rounded-lg focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  )
}
