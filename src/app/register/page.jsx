import React from 'react'
import RegisterComponent from '../components/RegisterComponent'

function RegisterPage() {
    return (
      <div className='px-4 flex flex-1 justify-center items-center h-screen'>
      <div className="w-1/3">
      <div className="p-4 bg-slate-200 shadow-sm rounded-lg">
                <h1 className='text-center font-medium text-lg'>Create an Account</h1>
      <RegisterComponent/>
      </div>
      </div>
      </div>
    )
}

export default RegisterPage