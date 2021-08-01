import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, MenuItem, Select } from "@material-ui/core";
import "../App.css";

function SignUp() {
	const alert = useAlert();
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("0");
	//const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const registration = { name, email, password, role };
		//https://jportal-backend.herokuapp.com/register

		let response = await axios.post(
			"https://jportal-backend.herokuapp.com/register",
			registration
		);
		console.log(response.data);
		//setErrorMessage(response.data.message);
		if (response.data.message === "User Registered") {
			setName("");
			setEmail("");
			setPassword("");
			alert.show(
				"You have successfully signed up. Please proceed to login"
			);
		} else {
			alert.show(response.data.message);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="offset-4 col-4">
					<form onSubmit={handleSubmit}>
						<label className="form-label mb-2" htmlFor="name">
							Name
						</label>
						<input
							className="form-control mb-2"
							id="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter your name"
							type="text"
						/>
						<label className="form-label mb-2" htmlFor="email">
							Email
						</label>
						<input
							className="form-control mb-2"
							id="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							type="email"
						/>
						<label className="form-label mb-2" htmlFor="password">
							Password
						</label>
						<input
							className="form-control mb-2"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							type="password"
						/>
						<label className="form-label mb-2">Sign up as:</label>{" "}
						<br />
						<Select
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<MenuItem value={"0"}>Job Seeker</MenuItem>
							<MenuItem value={"1"}>Recruiter</MenuItem>
						</Select>
						<br />
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Sign Up
						</Button>
					</form>
					<h5 className="mb-3">Already have an account?</h5>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							history.push("/login");
						}}
					>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
