import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Chip from '@material-ui/core/Chip';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import GradeIcon from '@material-ui/icons/Grade';
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import styles from "../Styles/PalleteList.Styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/green";
import { CSSTransition, TransitionGroup } from "react-transition-group";


class PaletteList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			openDeleteDialog: false,
			deletingId: "",
		};
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.goToPalette = this.goToPalette.bind(this);

	}
	handleClick = () => {
		window.location.href = "https://github.com/AsishRaju/coolors";
	};
	openDialog(id) {
		this.setState({ openDeleteDialog: true, deletingId: id });
	}
	closeDialog() {
		this.setState({ openDeleteDialog: false, deletingId: "" });
	}
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}
	handleDelete() {
		this.props.deletePalette(this.state.deletingId);
		this.closeDialog();
	}
	render() {

		const { palettes, classes } = this.props;
		const { openDeleteDialog } = this.state;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>

						<h1 className={classes.heading}>
							Cool
						<img src="/logo192.png" alt="logo" style={
								{
									paddingTop: "2px",
									height: "18px",
									width: "18px"
								}
							} />
							rs</h1>

						<h3><Link to="/palette/new" style={{ color: "#f6b906", textDecoration: "none", fontFamily: "monospace" }}>Create Palette</Link></h3>
						<Chip
							icon={<GradeIcon />}
							label="This Project"
							clickable
							color="primary"
							style={{ backgroundColor: '#23a659', fontWeight: "700" }}
							onClick={this.handleClick}
						/>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									{...palette}
									goToPalette={this.goToPalette}
									// handleDelete={deletePalette}
									openDialog={this.openDialog}
									key={palette.id}
									id={palette.id}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
					<DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItem>
					</List>
				</Dialog>
			</div >
		);
	}
}
export default withStyles(styles)(PaletteList);
