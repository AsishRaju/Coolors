import React, { Component } from "react";
import ColorBox from "./ColorBox";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { withStyles } from "@material-ui/styles";
import styles from "../Styles/Palette.Styles";
class SingleColorPalette extends Component {
	constructor(props) {
		console.log("hy");
		super(props);
		this.state = { format: "hex" };
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		this.changeFormat = this.changeFormat.bind(this);
	}
	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
		}
		return shades.slice(1);
	}
	changeFormat(value) {
		this.setState({ format: value });
	}
	render() {
		const { format } = this.state;
		const { classes } = this.props;
		const colorBoxes = this._shades.map((color) => {
			return <ColorBox key={color.name} name={color.name} background={color[format]} showingFullPalette={false}></ColorBox>;
		});
		return (
			<div className={classes.Palette}>
				<Navbar handleChange={this.changeFormat} isSingleColor={true}></Navbar>
				<div className={classes.colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${this.props.palette.id}`} className="back-button">
							Go Back
						</Link>
					</div>
				</div>
				<Footer paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}></Footer>
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
