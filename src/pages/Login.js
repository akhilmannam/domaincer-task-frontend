import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

function Login() {
	const alert = useAlert();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const login = { email, password };
		let response = await axios.post("https://jportal-backend.herokuapp.com/login", login);
		window.localStorage.setItem("login_token", response.data.token);
		window.localStorage.setItem("role", response.data.role);
        console.log(response.data);
		if (response.data.message === "Allow" && response.data.role === "1") {
			alert.show("Logging in... Please wait");
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
			alert.show("Logging in...");
			history.push({
				pathname: `/candidate/${response.data.id}`,
				state: {
					name: response.data.name,
				},
			});
		} else {
			alert.show(response.data.message);
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
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Login
						</Button>
						<br />
					</form>
					<h5 className="mb-3">Don't have an account?</h5>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							history.push("/signup");
						}}
					>
						Sign Up
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Login;
