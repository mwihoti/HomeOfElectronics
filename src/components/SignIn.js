import React from 'react'


const SignIn = () => {
    
  return (
    <div>
        <form>
            <label >
                <strong>FirstName</strong>
                <input type="text" name='firstname' required />

            </label>

            <label>
                <strong>LastName:</strong>
                <input type='text' name='lastname' required />
            </label>

            <label>
                <strong>Email:</strong>
                <input type='text' name='email' required />
            </label>

            <label>
                <strong>Password:</strong>
                <input type='password' name='password' required />
            </label>

            <label>
                <strong>Re-enter Password:</strong>
                <input type='password' name='password' required />
            </label>

        </form>
    </div>
  )
}

export default SignIn