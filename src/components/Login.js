import React from 'react'

const LoginPage = () => {
  return (
    <div className='mx-auto'>
        <h1>Welcome to HomeOfElectronics</h1>
        <form>
            <label>
                Username:
                <input type='text' name='username' required/>
            </label> 
            <label>
                Password:
                <input type='password' name='password' required/>
            </label>

            <button type='submit'>Login</button>

        </form>
    </div>
  )
}

export default Login