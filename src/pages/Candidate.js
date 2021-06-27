import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	useHistory,
	useLocation,
	withRouter,
	useParams,
} from "react-router-dom";
import { useAlert } from "react-alert";

function Candidate() {
	const alert = useAlert();
	const params = useParams();
	console.log(params.id);
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
		}
		fetchData();
		setLoaded(true);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		async function fetchApplyData() {
			let response = await axios.get(
				`https://jportal-backend.herokuapp.com/applied/${params.id}`,
				{
					headers: {
						Accept: "application/json",
						Authorization:
							window.localStorage.getItem("login_token"),
					},
				}
			);
			setDisabled(response.data.applied);
		}
		fetchApplyData();
	});

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
									let temp = [...disabled];
									temp[index] = true;
									disabled = temp;
									setDisabled(disabled);

									let applied = {
										name: candidateName,
										jobApplied: job.jobDesc,
										recruiterID: job.recruiterID,
										applied: disabled[index],
									};
									console.log(applied);
									console.log(index);
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
									async function appliedData() {
										await axios.post(
											`https://jportal-backend.herokuapp.com/:id`,
											{
												userID: params.id,
												applied: disabled,
											},
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
									appliedData();
									localStorage.setItem("disabled", disabled);
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
