import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

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
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import sizing from '@material-ui/system';

import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import DisplayTable from './displayTable';
import UploadImage from './uploadImage';

import { getWebsiteInfo, addWebsiteInfo  } from '../../actions/websiteinfo';

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

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        // formDatas = null;
        setEditdate({ infoId: "",infoName: "",infoContent: "",infoImage:""});
        // console.log(formDatas);
    };

    const popopen = Boolean(anchorEl);
    const id = popopen ? 'simple-popper' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    // 给修改表设置value
    // let [editdate, setEditdate] = React.useState({});
    let [editdate, setEditdate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { infoId: "",infoName: "",infoContent: "",infoImage:""}
    );
    // 使用 useCallback 来声明函数, 减少组件重绘时重新声明函数的开销
    const handleOnChange = React.useCallback(event => {
        if (event.target.name == "infoImage") {
            setEditdate({ [event.target.name]: event.target.files[0] });
        } else {
            setEditdate({ [event.target.name]: event.target.value });
        }
    }, [editdate]);

    const handleOnSubmit = React.useCallback(event => {
        // 提交表单
        let fileData = new FormData();

        for (var key in editdate) {
            fileData.append(key, editdate[key]);
            console.log(key, editdate[key]);
        }
        dispatch(addWebsiteInfo(fileData))

        event.preventDefault();
    }, [dispatch, editdate]);

    let { current: deleteDatas } = React.useRef({});

    const deleteFunction = (deletelist) => {
        // deleteDatas["isDelete"] = 1;
        // deleteDatas["infoId"] = deletelist;
        // console.log(deletelist);
        // dispatch(addWebsiteInfo(deleteDatas));
    }


    //   let [editdate, resetEditdate] = React.useReducer(
    //     (state, newState) => ({state, ...newState}),
    //     { questionId:"",questionTitle:"",questionImage:"",tmpquestionImage:"",questionTip:"",answer1:"",answer2:"",answer3:"",answer4:"",rightAnswer:"1"}
    //   );
    const editFunction = (editlist) => {
        console.log(editlist);
        websiteinfoList.map((row, index) => {
            if (row["infoId"] === editlist[0]) {
                console.log(row);
                setEditdate(row);
            }
        })
        // console.log(formDatas);
        setAnchorEl(anchorEl ? null : editlist);
    }
    const message = useSelector(state => state.websiteinfoData.message);
    // //componentDidUpdate --- Only re-run the effect if message changes
    useEffect(() => {
        if(message == "success"){
            handleClose();
            dispatch(getWebsiteInfo());
        }
    }, [message])

    useEffect(() => {
        dispatch(getWebsiteInfo())
    }, [dispatch])

    const headCells = [
        { id: 'infoName', numeric: false, disablePadding: false, label: '名称' },
        { id: 'infoContent', numeric: false, disablePadding: false, label: '内容' },
        { id: 'infoImageurl', numeric: false, disablePadding: false, label: '照片' },
    ];

    const websiteinfoList = useSelector(state => state.websiteinfoData.data);

    if (websiteinfoList == undefined) {
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
                                <DisplayTable rows={websiteinfoList} headCells={headCells} deleteFunction={deleteFunction} editFunction={editFunction} />
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
                            <form noValidate autoComplete="off" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                            <input type="hidden" name="rateId" value={editdate.rateId} />
                            <div class="col-md-12 padding-left-25">
                                    <div className="margin-top-10">
                                        网站内容：{editdate.infoName}
                                    </div>
                                </div>                                
                                <div class="col-md-12 padding-left-25">
                                    <div className="margin-top-10">
                                        <TextField
                                            multiline
                                            rows={5}
                                            label="内容"
                                            fullWidth
                                            name="infoContent"
                                            value={editdate.infoContent}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-12 padding-left-25">
                                    <div className="margin-top-10">
                                        <img src={editdate.infoImageurl} />
                                    </div>
                                    <div className="margin-top-10">
                                        <UploadImage imageName={"infoImage"} />
                                    </div>
                                </div>
                                <div class="col-md-12  margin-10">
                                    <Button type="submit" variant="contained" color="primary">
                                        提交
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Popover>
            </main>
        </div>
    );
}

export default Dashboard;
