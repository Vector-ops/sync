import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import "./Header.scss";

import React from "react";

const Header = () => {
	return (
		<div className="app__header">
			<h1 className="app__title">Sync</h1>
			<Button
				variant="contained"
				color="primary"
				style={{ backgroundColor: "#2c3e50" }}
			>
				<AddBoxIcon color="#2c3e50" />
			</Button>
		</div>
	);
};

export default Header;
