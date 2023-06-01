import { ReactComponent as GoogleLogo } from "./assets/google-logo.svg";
import { useGoogleLogin } from "@react-oauth/google";
import localforage from "localforage";

const App = () => {
	const handler = useGoogleLogin({
		onSuccess: ({ access_token }) => {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
				)
				.then((res) => res.json())
				.then(({ data }) => {
					localforage.set("firstName", data.given_name);
					localforage.set("lastName", data.family_name);
				});
		},
	});

	const loginHandler = () => {
		handler();
	};

	return (
		<div className="h-screen w-screen bg-login2 bg-cover bg-center relative">
			<div className="h-full w-full flex flex-col justify-center items-center backdrop-brightness-[30%]">
				<h1 className="font-poppins text-6xl text-white font-bold">
					Movie Book
				</h1>
				<button
					className="flex justify-between items-center p-4 mt-14 w-56 text-md text-ubuntu font-bold text-[#EDF2F4] bg-[#D90429] shadow-sm rounded-lg hover:bg-[#EF233C] focus:bg-[#EF233C]"
					onClick={loginHandler}
				>
					<GoogleLogo fill="white" />
					<span>Continue with Google</span>
				</button>
			</div>
			<h3 className="text-white text-xs absolute bottom-2 left-2">
				Photo by Samuel Regan-Asante on Unsplash
			</h3>
		</div>
	);
};

export default App;
