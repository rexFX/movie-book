import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		// children: [
		//   {
		//     path: "/dashboard",
		//     element: <Dashboard />,
		//   },
		//   {
		//     path: "/details",
		//     element: <Details />,
		//   }
		// ]
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
			<RouterProvider router={router} />
		</GoogleOAuthProvider>
	</React.StrictMode>
);
