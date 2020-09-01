import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { withStyles } from "@material-ui/styles";
import styles from "../Styles/Palette.Styles";

class Palette extends Component {
	constructor(props) {
		super();
		this.state = { level: 500, format: "hex" };
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}
	changeLevel(level) {
		this.setState({ level });
	}
	changeFormat(value) {
		this.setState({ format: value });
	}
	render() {
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const { level } = this.state;
		const colorBoxes = colors[level].map((color) => {
			return (
				<ColorBox
					background={color[this.state.format]}
					name={color.name}
					key={color.id}
					moreUrl={`/palette/${id}/${color.id}`}
					showingFullPalette={true}
				></ColorBox>
			);
		});
		return (
			<div className={classes.Palette}>
				<Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} isSingleColor={false} />
				<div className={classes.colors}>{colorBoxes}</div>
				<Footer paletteName={paletteName} emoji={emoji}></Footer>
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
