import React from 'react'
import Navbar from '../Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
const Login = () => {
    const loading=false;
  return (
    <>
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-700 rounded-md p-8 my-10 bg-gray-700 text-white"
        >
          <h1 className="font-bold text-2xl mb-5">Login</h1>
          <div className="my-4">
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              name="email"
              
              placeholder="ABC@gmail.com"
              className="bg-gray-200 text-white border-gray-700"
            />
          </div>
         
          <div className="my-4">
            <Label className="text-white">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="**********"
              className="bg-gray-200 text-white border-gray-700"
            />
          </div>
         
          {loading ? (
            <Button className="w-full my-4 bg-blue-600 hover:bg-blue-700">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-blue-600 hover:bg-blue-700"
            >
              Signup
            </Button>
          )}
          <span className="text-sm text-gray-400">
            Add Account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login