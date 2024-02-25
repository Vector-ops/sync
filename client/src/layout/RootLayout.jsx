import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const RootLayout = () => {
	return (
		<div style={{ height: "100%" }}>
			<Header />

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default RootLayout;
