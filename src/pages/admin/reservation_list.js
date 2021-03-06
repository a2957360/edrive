import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'braft-editor/dist/index.css'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import { mainListItems, secondaryListItems } from './listItems';
import DisplayTable from './displayTable';

import { getReservation } from '../../actions/reservation';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function Dashboard() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [anchorEl, setAnchorEl] = React.useState(null);


    const popopen = Boolean(anchorEl);
    const id = popopen ? 'simple-popper' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteFunction = (deletelist) => {

    }

    const [reportImage, setreportImage] = React.useState("");
    const [applyImage, setapplyImage] = React.useState("");

    const editFunction = (editlist) => {
        reservationList['list'].map((row, index) => {
            if (row["reservationId"] === editlist[0]) {
                setreportImage(row['examReportImageUrl']);
                setapplyImage(row['examApplyImageUrl']);
            }
        })
        setAnchorEl(anchorEl ? null : editlist);
    }
    useEffect(() => {
        let data = { "isGet": 1};
        dispatch(getReservation(data));
    }, [dispatch])

    const headCells = [
        { id: 'licenseName', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'reservationName', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'reservationLevel', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'carTime', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'courseTime', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'isBDE', numeric: false, disablePadding: false, label: 'isBDE' },
        { id: 'courseExamTime', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'reservationArea', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'coachName', numeric: false, disablePadding: false, label: '????????????' },
    ];

    const reservationList = useSelector(state => state.reservationData.data);

    if (reservationList == null) {
        return ("loading");
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    {/* <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                {/* <Divider />
                <List>{secondaryListItems}</List> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <DisplayTable rows={reservationList['list']} headCells={headCells} deleteFunction={deleteFunction} editFunction={editFunction} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                    </Box>
                </Container>

                <Popover
                    id={id}
                    open={popopen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 200, left: 800 }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div class="col-md-12 padding-left-25 jd-cells">
                                <div className="row">
                                    <div class="col-md-12  margin-10 text-center">
                                        ???????????????<img src={reportImage}></img>
                                        ??????????????????<img src={applyImage}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover>
            </main >
        </div >
    );
}

export default Dashboard;
