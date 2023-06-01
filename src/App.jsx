import { Outlet } from "react-router-dom";

const App = () => {
	return (
		<div className="h-screen w-screen bg-login bg-cover bg-center">
			<div className="h-full w-full backdrop-brightness-[40%]">
				<Outlet />
			</div>
		</div>
	);
};

export default App;
