import React from 'react'

const Login = ({ handleLogin, handleChange, username, password }) => {
	return (
		<form onSubmit={handleLogin.bind(null)}>
			<input name="username" type="text" placeholder="Username..." value={username} onChange={handleChange}/>
			<input name="password" type="password" placeholder="Password..." value={password} onChange={handleChange}/>
			<button>Login</button>
		</form>

	)

}

export default Login