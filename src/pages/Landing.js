import React from "react";
import { Link } from "react-router-dom";

function Landing() {
	return (
		<div className="container mt-2">
			<div className="row mb-2 p-2 justify-content-end">
				<Link to="/signup">
					<button className="btn btn-primary m-2">Signup</button>
				</Link>
				<Link to="/login">
					<button className="btn btn-primary m-2">Login</button>
				</Link>
			</div>
			<div className="row mb-2">
				<p>
					Hello, Welcome to the professional job portal. We thrive to
					enhance your experience.
				</p>
			</div>
		</div>
	);
}

export default Landing;
