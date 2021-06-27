import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import ProtectedRoute from "./routes/ProtectedRoute";
import Recruiter from "./pages/Recruiter";
import Candidate from "./pages/Candidate";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/login" component={Login} />
				<ProtectedRoute
					exact
					path="/recruiter/:id"
					component={Recruiter}
				/>
				<ProtectedRoute
					exact
					path="/candidate/:id"
					component={Candidate}
				/>
			</Switch>
		</Router>
	);
}

export default App;
