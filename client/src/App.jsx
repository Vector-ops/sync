import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				element={<RootLayout />}
				errorElement={<ErrorPage />}
			>
				<Route index element={<Home />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
