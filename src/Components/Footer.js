import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../Styles/Footer.Styles";

function Footer(props) {
	return (
		<footer className={props.classes.PaletteFooter}>
			{props.paletteName}
			<span className={props.classes.emoji}>
				<span>{props.emoji}</span>
			</span>
		</footer>
	);
}
export default withStyles(styles)(Footer);
