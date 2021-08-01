import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Landing() {
	return (
		<div className="container mt-2">
			<div className="row mb-2 p-2 justify-content-between">
				<Link to="/signup">
					<Button variant="contained" color="primary">
						Signup
					</Button>
				</Link>
				<Link to="/login">
					<Button variant="contained" color="primary">
						Login
					</Button>
				</Link>
			</div>
			<div className="row mb-2 justify-content-center">
				<p className="heading text-center">
					Hello, Welcome to the professional job portal. We thrive to
					enhance your experience.
				</p>
			</div>
		</div>
	);
}

export default Landing;
