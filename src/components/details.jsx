import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { ReactComponent as LoadingSpinner } from "../assets/loading.svg";

const Details = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const props = location.state;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");
	const [bookingResult, setBookingResult] = useState(false);

	useEffect(() => {
		localforage.getItem("firstName").then((value) => {
			setName(value);
		});

		localforage.getItem("email").then((value) => {
			setEmail(value);
		});
	}, []);

	const goBack = () => {
		navigate("../dashboard");
	};

	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);

	if (name === "" || email === "") {
		return (
			<div className="flex flex-col h-full w-full justify-center items-center">
				<LoadingSpinner fill="white" className="scale-150" />
			</div>
		);
	}

	return (
		<div className="h-full w-full overflow-y-auto bg-[black] bg-opacity-[60%]">
			<header className="text-white h-16 shadow-lg flex justify-center">
				<div className="h-full w-[90%] flex justify-between items-center">
					<h1 className="font-poppins text-lg font-bold">Details</h1>
					<button
						className="p-2 px-4 bg-[#D90429] h-[65%] rounded-lg shadow-lg text-ubuntu font-bold transition-colors hover:bg-[#EF233C]"
						onClick={goBack}
					>
						Back
					</button>
				</div>
			</header>
			<div className="w-full flex-1 flex flex-col justify-center items-center">
				<h1 className="text-white font-poppins font-bold text-2xl my-4">
					{props.name}
				</h1>
				<img
					src={props.image}
					alt={props.name}
					className="shadow-lg rounded-r-lg h-[295px] w-[210px]"
				/>
				<div className="flex flex-col justify-center items-center p-8">
					<div className="mt-8 w-full">
						<h1 className="text-white font-poppins font-bold text-2xl">
							Summary
						</h1>
						<p className="text-white font-noto text-xl my-4">
							{props.summary.replace(/<(.|\n)*?>/g, "")}
						</p>
					</div>
					<div className="mt-4 w-full">
						<h1 className="text-white font-poppins font-bold text-2xl">
							Rating
						</h1>
						<p className="text-white font-noto text-xl my-4">
							{props.rating}
						</p>
					</div>
					<div className="mt-4 w-full">
						<h1 className="text-white font-poppins font-bold text-2xl my-4">
							Genres
						</h1>
						<p className="text-white font-noto text-xl my-4">
							{props.genres.join(", ")}
						</p>
					</div>
					<div className="mt-4 w-full">
						<h1 className="text-white font-poppins font-bold text-2xl my-4">
							Language
						</h1>
						<p className="text-white font-noto text-xl my-4">
							{props.language}
						</p>
					</div>
					<button
						className="p-4 bg-[#D90429] h-[75%] rounded-lg shadow-lg text-ubuntu font-bold transition-colors hover:bg-[#EF233C] focus:bg-[#EF233C] text-white"
						onClick={onOpenModal}
					>
						Book Ticket
					</button>
					<Modal
						open={open}
						onClose={onCloseModal}
						center
						classNames={{
							overlay: "bg-[black] bg-opacity-[60%]",
							modal: "bg-[#2B2D42] bg-opacity-[90%] rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[30%] lg:max-w-[30%]",
						}}
					>
						<div>
							<form>
								<div className="flex flex-col justify-center items-center">
									<h1 className="text-white font-poppins font-bold text-2xl my-4">
										Book Ticket
									</h1>
									<div className="flex flex-col justify-center items-center my-2">
										<input
											type="text"
											value={name}
											placeholder="Enter your name"
											onChange={(e) => {
												setName(e.target.value);
											}}
											className="p-2 rounded-lg shadow-lg text-ubuntu font-bold text-black"
										/>
									</div>
									<div className="flex flex-col justify-center items-center my-2">
										<input
											type="email"
											value={email}
											placeholder="Enter your email"
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											className="p-2 rounded-lg shadow-lg text-ubuntu font-bold text-black"
										/>
									</div>
									<div className="flex flex-col justify-center items-center my-2">
										<input
											type="tel"
											placeholder="Enter your phone number"
											value={phone}
											onChange={(e) => {
												setPhone(e.target.value);
											}}
											className="p-2 rounded-lg shadow-lg text-ubuntu font-bold text-black"
										/>
									</div>
									<div className="flex flex-col justify-center items-center my-2">
										<input
											type="date"
											value={date}
											onChange={(e) => {
												setDate(e.target.value);
											}}
											className="p-2 rounded-lg shadow-lg text-ubuntu font-bold text-black"
										/>
									</div>
								</div>
								<div className="flex justify-center items-center">
									<button
										onClick={(event) => {
											event.preventDefault();
											if (
												name !== "" &&
												email !== "" &&
												phone !== "" &&
												date !== ""
											) {
												setBookingResult(true);
												onCloseModal();
											}
										}}
										className="p-4 bg-[#D90429] h-[75%] rounded-lg shadow-lg text-ubuntu font-bold transition-colors hover:bg-[#EF233C] focus:bg-[#EF233C] text-white"
									>
										Book
									</button>
								</div>
							</form>
						</div>
					</Modal>
					<div className="flex flex-col justify-center items-center">
						{bookingResult && (
							<div className="flex flex-col justify-center items-center mt-8 p-3">
								<h1 className="text-white font-poppins font-bold text-2xl my-4">
									Booking Successful
								</h1>
								<p className="text-white font-noto text-xl my-4">
									The ticket has been booked for {name} on{" "}
									{date}. We have sent you an email on {email}{" "}
									with the ticket details.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
