import React from 'react'

const Register = ({ handleRegister, handleChange, username, password, verify_password, email, name, bio, city, state }) => {
	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister.bind(null)}>
				<input name="username" type="text" placeholder="Username..." value={username} onChange={handleChange}/><br />
				<input name="password" type="password" placeholder="Password..." value={password} onChange={handleChange}/><br />
				<input name="verify_password" type="password" placeholder="Verify password..." value={verify_password} onChange={handleChange}/><br />
				<input name="email" type="text" placeholder="Email..." value={email} onChange={handleChange}/><br />
				<input name="name" type="text" placeholder="Name..." value={name} onChange={handleChange}/><br />
				<input name="bio" type="text" placeholder="Bio..." value={bio} onChange={handleChange}/><br />
				<input name="city" type="text" placeholder="City..." value={city} onChange={handleChange}/><br />
				<input name="state" type="text" placeholder="State..." value={state} onChange={handleChange}/><br />
				<button>Register</button>
			</form>
		</div>
	)
}


export default Register