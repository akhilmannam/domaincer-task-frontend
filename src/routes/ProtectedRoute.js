import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				window.localStorage.getItem("login_token") &&
				window.localStorage.getItem("role") ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

export default ProtectedRoute;
