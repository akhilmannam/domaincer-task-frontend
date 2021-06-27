import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

function Login() {
	const alert = useAlert();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		alert.show("Logging in... Please wait");
		const login = { email, password };
		let response = await axios.post(
			"https://jportal-backend.herokuapp.com/login",
			login
		);
		window.localStorage.setItem("login_token", response.data.token);
		window.localStorage.setItem("role", response.data.role);
		setMessage(response.data.message);
		if (response.data.message === "Allow" && response.data.role === "1") {
			history.push({
				pathname: `/recruiter/${response.data.id}`,
				state: {
					name: response.data.name,
				},
			});
		} else if (
			response.data.message === "Allow" &&
			response.data.role === "0"
		) {
			history.push({
				pathname: `/candidate/${response.data.id}`,
				state: {
					name: response.data.name,
				},
			});
		} else {
			history.push("/login");
		}
		setEmail("");
		setPassword("");
	};

	return (
		<div className="container">
			<div className="row">
				<div className="offset-4 col-4">
					<form onSubmit={handleSubmit}>
						<label className="form-label mb-2" htmlFor="email">
							Email
						</label>
						<input
							className="form-control mb-2"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							type="email"
							id="email"
						/>
						<label className="form-label mb-2" htmlFor="password">
							Password
						</label>
						<input
							className="form-control mb-2"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							type="password"
							id="password"
						/>
						<button className="btn btn-primary mb-2" type="submit">
							Login
						</button>
						<br />
						<span>{message}</span>
					</form>
					<h5 className="mb-2">Don't have an account?</h5>
					<button
						className="btn btn-primary mb-2"
						onClick={() => {
							history.push("/signup");
						}}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
