"use client"



import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'


function LoginComponent() {
    let router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            let data = await response.json();

            if (response.ok) {
                console.log('Login successful');
                // Redirect or perform any other action upon successful login
                router.push("/")
                reset();
            } else {
                const responseData = await response.json();
                console.error('Login failed:', responseData.msg);
                // Handle login failure
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle network errors or other errors
        }
    };


    return (
        <>


            <form onSubmit={handleSubmit(onSubmit)}>





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

export default LoginComponent
