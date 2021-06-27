import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function SignUp() {
	const alert = useAlert();
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("0");

	const handleSubmit = (e) => {
		e.preventDefault();
		const registration = { name, email, password, role };
		async function postRegistrationData() {
			await axios.post(
				"https://jportal-backend.herokuapp.com/register",
				registration
			);
		}
		postRegistrationData();
		setName("");
		setEmail("");
		setPassword("");
		alert.show("You have successfully signed up. Please proceed to login");
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
						<select
							className="form-select mb-2"
							aria-label="Default select example"
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="0">Job Seeker</option>
							<option value="1">Recruiter</option>
						</select>
						<br />
						<button className="btn btn-primary mb-2" type="submit">
							Sign Up
						</button>
					</form>
					<h5 className="mb-2">Already have an account?</h5>
					<button
						className="btn btn-primary mb-2"
						onClick={() => {
							history.push("/login");
						}}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
