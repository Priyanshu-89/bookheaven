"use client"
import { CreateAccount } from "../actions/CreateAccount"
 import {useForm} from 'react-hook-form'


function RegisterComponent() {
     const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        await CreateAccount(data)
    }

   
    return (
        <>


            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className='my-3 flex flex-col gap-2'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" className='border px-3 py-2 rounded w-full' name='name' id='name' placeholder='Marry' 
                        {...register('name',{required:true})}
                    />
                   {
                    errors.name && <span className="text-red-500 text-xs">Name is required</span>
                   }
                </fieldset>

                <fieldset className='my-3 flex flex-col gap-2'>
                    <label htmlFor='contact'>Contact</label>
                    <input type="text" className='border px-3 py-2 rounded w-full' name='contact' id='contact' placeholder='9546xxxxxx' 
                    {...register('contact', {
                        required: 'Contact is required',
                        maxLength: { value: 10, message: 'Contact must be at least 10 digits long' },
                        pattern: { value: /^[0-9]+$/, message: 'Contact must contain only digits' }
                    })}
                    />
                     {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
                </fieldset>

                <fieldset className='my-3 flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    className='border px-3 py-2 rounded w-full'
                    name='email'
                    id='email'
                    placeholder='marry@gmail.com'
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address'
                        }
                    })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </fieldset>
               {/* passowrd  */}

               <fieldset className='my-3 flex flex-col gap-2'>
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    className='border px-3 py-2 rounded w-full'
                    name='password'
                    id='password'
                    placeholder='**********'
                    {...register('password', {
                        required: 'Password is required',
                        maxLength: {
                            value: 10,
                            message: 'Password must not exceed 10 characters'
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{1,}$/,
                            message: 'Password must contain at least one digit and one special character'
                        }
                    })}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </fieldset>
                <fieldset className='my-3 flex flex-col gap-2'>
                    <button type="submit" className='text-cyan-100 bg-cyan-700 px-12 py-2 rounded-md'>Register</button>
                </fieldset>
            </form>


        </>
    )
}

export default RegisterComponent
