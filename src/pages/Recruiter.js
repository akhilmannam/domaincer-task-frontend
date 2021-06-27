import axios from "axios";
import React, { useState, useEffect } from "react";
import {
	withRouter,
	useParams,
	useHistory,
	useLocation,
} from "react-router-dom";
import { useAlert } from "react-alert";

function Recruiter() {
	const alert = useAlert();
	const params = useParams();
	const history = useHistory();
	const location = useLocation();
	const recruiterName = location.state.name;
	const [company, setCompany] = useState("");
	const [jobDesc, setJobDesc] = useState("");
	const [experience, setExperience] = useState(0);
	const [applications, setApplications] = useState();

	useEffect(() => {
		async function fetchData() {
			let response = await axios.get(
				`https://jportal-backend.herokuapp.com/applications/${params.id}`,
				{
					headers: {
						Accept: "application/json",
						Authorization:
							window.localStorage.getItem("login_token"),
					},
				}
			);
			setApplications(response.data);
		}
		fetchData();
		// eslint-disable-next-line
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let jobDetails = {
			company,
			jobDesc,
			experience,
			recruiterID: params.id,
		};
		async function postJobDetails() {
			await axios.post(
				`https://jportal-backend.herokuapp.com/jobs`,
				jobDetails,
				{
					headers: {
						Accept: "application/json",
						Authorization:
							window.localStorage.getItem("login_token"),
					},
				}
			);
		}
		postJobDetails();
		alert.show("You have successfully posted a job");
		setCompany("");
		setJobDesc("");
		setExperience(0);
	};

	const handleLogout = () => {
		window.localStorage.removeItem("login_token");
		window.localStorage.removeItem("role");
		history.push("/login");
	};

	return (
		<div className="container mt-2">
			<div className="row mb-2 d-flex justify-content-around align-items-center">
				<p className="pt-3">Welcome {recruiterName}</p>
				<button className="btn btn-primary" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className="row mb-2">
				<div className="offset-3 col-6">
					<form onSubmit={handleSubmit}>
						<label className="form-label mb-2" htmlFor="company">
							Company Name
						</label>
						<input
							className="form-control mb-2"
							required
							value={company}
							onChange={(e) => setCompany(e.target.value)}
							placeholder="Enter the company name"
							type="text"
							id="company"
						/>
						<label htmlFor="jd" className="form-label mb-2">
							Job Description
						</label>
						<textarea
							class="form-control mb-2"
							id="jd"
							value={jobDesc}
							onChange={(e) => setJobDesc(e.target.value)}
						></textarea>

						<label className="form-label mb-2" htmlFor="experience">
							Experience
						</label>
						<input
							className="form-control mb-2"
							required
							value={experience}
							onChange={(e) => setExperience(e.target.value)}
							placeholder="Enter your experience in years"
							type="number"
							id="experience"
							min="0"
							max="80"
							step="1"
						/>
						<button className="btn btn-primary mb-2" type="submit">
							Post Job
						</button>
					</form>
				</div>
			</div>
			<div className="row mb-2 justify-content-center p-2">
				<p>List of applications for jobs posted</p>
				<table class="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Applicant Name</th>
							<th scope="col">Applied Domain</th>
						</tr>
					</thead>
					<tbody>
						{applications &&
							applications.map((application) => (
								<tr>
									<td>{application.name}</td>
									<td>{application.jobApplied}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default withRouter(Recruiter);
