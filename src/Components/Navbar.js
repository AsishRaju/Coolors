import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styles from "../Styles/Navbar.Styles";
import "rc-slider/assets/index.css";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { format: "hex", open: false };
		this.handleFormatChange = this.handleFormatChange.bind(this);
		this.closeSanckbar = this.closeSanckbar.bind(this);
	}
	handleFormatChange(e) {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	}
	closeSanckbar() {
		this.setState({ open: false });
	}
	render() {
		const { classes } = this.props;
		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">coolors</Link>
				</div>
				{!this.props.isSingleColor && (
					<div>
						<span>{`Level:${this.props.level}`} &nbsp; </span>
						<div className={classes.slider}>
							<Slider defaultValue={this.props.level} min={100} max={900} step={100} onAfterChange={this.props.changeLevel}></Slider>
						</div>
					</div>
				)}

				<div className={classes.selectContainer}>
					<Select value={this.state.format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">HEX- #ffffff</MenuItem>
						<MenuItem value="rgb">RGB- rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA- rgba(255,255,255,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={this.state.open}
					autoHideDuration={3000}
					message={<span id="message-id">Format Changed</span>}
					ContentProps={{ "aria-describedby": "message-id" }}
					onClose={this.closeSanckbar}
					action={[
						<IconButton onClick={this.closeSanckbar} color="inherit" key="close" aria-label="close">
							<CloseIcon></CloseIcon>
						</IconButton>,
					]}
				></Snackbar>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
