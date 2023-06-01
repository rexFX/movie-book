import { useEffect, useState } from "react";
import localforage from "localforage";
import { ReactComponent as LoadingSpinner } from "../assets/loading.svg";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Dashboard = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [movieList, setMovieList] = useState([]);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		localforage.getItem("firstName").then((value) => {
			setUser(value);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://api.tvmaze.com/search/shows?q=all")
			.then((res) => {
				setMovieList(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, [refresh]);

	if (user === null) {
		return (
			<div className="flex flex-col h-full w-full justify-center items-center">
				<LoadingSpinner fill="white" className="scale-150" />
			</div>
		);
	}

	const logoutHander = () => {
		googleLogout();
		localforage.clear().then(() => {
			navigate("/");
		});
	};

	return (
		<div className="flex flex-col h-full w-full">
			<header className="text-white bg-[black] bg-opacity-[60%] h-16 shadow-lg flex justify-center">
				<div className="h-full w-[90%] flex justify-between items-center">
					<h1 className="font-poppins text-lg font-bold">
						Welcome, {user}
					</h1>
					<button
						className="p-2 bg-[#D90429] h-[65%] rounded-lg shadow-lg text-ubuntu font-bold transition-colors hover:bg-[#EF233C] focus:bg-[#EF233C]"
						onClick={logoutHander}
					>
						Logout
					</button>
				</div>
			</header>
			<div className="flex-1 w-full overflow-y-auto overflow-x-auto flex justify-center items-center">
				{loading ? (
					<div className="h-full w-full flex flex-col justify-center items-center">
						<LoadingSpinner fill="white" className="scale-150" />
					</div>
				) : (
					<div className="w-[90%] md:w-[60%] lg:w-[40%] lg:h-[50%] flex flex-col justify-center items-center">
						{movieList.length > 0 ? (
							<Splide
								options={{
									height: "100%",
									width: "100%",
								}}
							>
								{movieList.map((movie) => (
									<SplideSlide key={movie.show.id}>
										<div className="flex items-center justify-between rounded-lg shadow-lg bg-black bg-opacity-80">
											<div className="text-center p-3 flex-1">
												<h2 className="text-white font-poppins font-bold text-md md:text-lg lg:text-xl border-b-2 mb-3 p-3">
													{movie.show.name}
												</h2>
												<p className="text-white font-noto text-sm md:text-md lg:text-lg">
													{movie.show.genres.join(
														", "
													)}
												</p>
												<p className="text-white font-noto text-sm my-3 md:text-md lg:text-lg">
													{movie.show.language}
												</p>
												{movie.show.rating.average && (
													<p className="text-white font-noto text-sm md:text-md lg:text-lg mt-3 border-t-2 p-2">
														Rating:{" "}
														{
															movie.show.rating
																.average
														}
													</p>
												)}
												<Link
													style={{
														width: "100%",
														height: "100%",
													}}
													to={`../details/${movie.show.id}`}
													state={{
														summary:
															movie.show.summary,
														rating: movie.show
															.rating.average,
														genres: movie.show
															.genres,
														language:
															movie.show.language,
														name: movie.show.name,
														image: movie.show.image
															.medium,
													}}
												>
													<div className="mt-6 p-2 bg-[#D90429] h-[75%] w-full rounded-lg shadow-lg text-ubuntu font-bold transition-colors hover:bg-[#EF233C] focus:bg-[#EF233C] text-white">
														Details
													</div>
												</Link>
											</div>
											<img
												src={movie.show.image.medium}
												alt={movie.show.name}
												className="shadow-lg rounded-r-lg h-[295px] w-[210px]"
											/>
										</div>
									</SplideSlide>
								))}
							</Splide>
						) : (
							<div className="flex flex-col justify-center items-center">
								<h1 className="text-white font-poppins font-bold text-2xl my-4">
									No movies found
								</h1>
								<button
									className="p-2 bg-[#D90429] h-[75%] rounded-lg shadow-lg text-ubuntu font-bold transition-colors hover:bg-[#EF233C] text-white"
									onClick={() => setRefresh(!refresh)}
								>
									Refresh
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
