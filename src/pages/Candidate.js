import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

function Candidate() {
	const alert = useAlert();
	const history = useHistory();
	const location = useLocation();
	const [jobs, setJobs] = useState([]);
	const [loaded, setLoaded] = useState(false);
	let [disabled, setDisabled] = useState([]);
	const candidateName = location.state.name;

	useEffect(() => {
		async function fetchData() {
			let response = await axios.get(
				`https://jportal-backend.herokuapp.com/jobs`,
				{
					headers: {
						Accept: "application/json",
						Authorization:
							window.localStorage.getItem("login_token"),
					},
				}
			);
			setJobs(response.data);

			setDisabled(new Array(response.data.length).fill(false));
		}
		fetchData();
		setLoaded(true);
		// eslint-disable-next-line
	}, []);

	const handleLogout = () => {
		window.localStorage.removeItem("login_token");
		window.localStorage.removeItem("role");
		history.push("/login");
	};

	if (!loaded) {
		return <p>Loading... Please wait</p>;
	}

	return (
		<div className="container mt-2">
			<div className="row mb-2 d-flex justify-content-around align-items-center">
				<p className="pt-3">Welcome {candidateName}</p>
				<button className="btn btn-primary" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className="row mb-2">
				{jobs.map((job, index) => (
					<div className="col-lg-4 col-md-6 col-sm-12 mb-2">
						<div className="card p-3">
							<p className="card-text">Company : {job.company}</p>
							<p className="card-text">
								Job Description : {job.jobDesc}
							</p>
							<p className="card-text">
								Experience : {job.experience} Years
							</p>
							<button
								key={index}
								disabled={disabled[index]}
								className="btn btn-warning"
								onClick={() => {
									let applied = {
										name: candidateName,
										jobApplied: job.jobDesc,
										recruiterID: job.recruiterID,
									};
									async function apply() {
										await axios.post(
											`https://jportal-backend.herokuapp.com/applications`,
											applied,
											{
												headers: {
													Accept: "application/json",
													Authorization:
														window.localStorage.getItem(
															"login_token"
														),
												},
											}
										);
									}
									apply();
									let temp = [...disabled];
									temp[index] = true;
									disabled = temp;
									setDisabled(disabled);
									alert.show(
										"You have applied for this job. Please check other jobs"
									);
								}}
							>
								Apply
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default withRouter(Candidate);
