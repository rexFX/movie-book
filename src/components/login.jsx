import { ReactComponent as GoogleLogo } from "../assets/google-logo.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const handler = useGoogleLogin({
		onSuccess: ({ access_token }) => {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
				)
				.then(({ data }) => {
					localforage.setItem("email", data.email);
					localforage
						.setItem("firstName", data.given_name)
						.then(() => {
							navigate("dashboard");
						});
				})
				.catch((err) => console.log(err));
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const loginHandler = () => {
		handler();
	};

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<h1 className="font-poppins text-6xl text-white font-bold">
				Movie Book
			</h1>
			<button
				className="flex justify-between items-center p-4 mt-14 w-56 text-md text-ubuntu font-bold text-[#EDF2F4] transition-colors bg-[#D90429] shadow-lg rounded-lg hover:bg-[#EF233C] focus:bg-[#EF233C]"
				onClick={loginHandler}
			>
				<GoogleLogo fill="white" />
				<span>Continue with Google</span>
			</button>
		</div>
	);
};

export default Login;
