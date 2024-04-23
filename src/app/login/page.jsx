
import React from 'react'

import LoginComponent from '../components/LoginComponent'

function LoginPage() {
    return (
      <div className='px-4 flex flex-1 justify-center items-center h-screen'>
      <div className="w-1/3">
      <div className="p-4 bg-slate-200 shadow-sm rounded-lg">
                <h1 className='text-center font-medium text-lg'>Login Here</h1>
      <LoginComponent/>
      </div>
      </div>
      </div>
    )
}

export default LoginPage