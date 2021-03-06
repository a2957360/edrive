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

import { getStudent } from '../../actions/student';
import { getCoachList } from '../../actions/coach';
import { changeReservation } from '../../actions/reservation';



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
        setEditdate({ videoId: "", videoTitle: "", videoContent: "", videotype: "" });
    };

    const popopen = Boolean(anchorEl);
    const id = popopen ? 'simple-popper' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    // ??????????????????value
    // let [editdate, setEditdate] = React.useState({});
    let [editdate, setEditdate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    let [coachdate, setCoachdate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );


    // ?????? useCallback ???????????????, ????????????????????????????????????????????????
    // const handleOnChange = React.useCallback(event => {
    //     setEditdate({ [event.target.name]: event.target.value });
    // }, [editdate]);

    // const handleOnSubmit = React.useCallback(event => {
    //     let data = {"isCoach":1,"reservationId":editdate.reservationId,"coachId":editdate.coachId,};
    //     dispatch(changeReservation(data))
    //     event.preventDefault();
    // }, [dispatch, editdate]);
    const handleOnSubmit = () => {
        let data = {"isCoach":1,"reservationId":editdate.reservationId,"coachId":editdate.coachId,};
        dispatch(changeReservation(data))
    };
    let { current: deleteDatas } = React.useRef({});

    const deleteFunction = (deletelist) => {
        // deleteDatas["isDelete"] = 1;
        // deleteDatas["videoId"] = deletelist;
        // console.log(deleteDatas);
        // dispatch(addVideo(deleteDatas));
    }

    const selectCoach = (info) => {
        setCoachdate(info);
        setEditdate({ "coachId": info.coachId });
    }
    //   let [editdate, resetEditdate] = React.useReducer(
    //     (state, newState) => ({state, ...newState}),
    //     { questionId:"",questionTitle:"",questionImage:"",tmpquestionImage:"",questionTip:"",answer1:"",answer2:"",answer3:"",answer4:"",rightAnswer:"1"}
    //   );
    const editFunction = (editlist) => {
        editdate = {};
        console.log(editlist);
        studentList.map((row, index) => {
            if (row["userId"] === editlist[0]) {
                console.log(row);
                setEditdate(row);
            }
        })
        // console.log(formDatas);
        setAnchorEl(anchorEl ? null : editlist);
    }
    const message = useSelector(state => state.reservationData.message);
    // //componentDidUpdate --- Only re-run the effect if message changes
    useEffect(() => {
        handleClose();
        let data = { "isGet": 1, "allStu": 1 };
        dispatch(getStudent(data));
    }, [message])

    useEffect(() => {
        let data = { "isGet": 1, "allStu": 1 };
        dispatch(getStudent(data));
    }, [dispatch])

    useEffect(() => {
        let data = { "isGet": 1 };
        dispatch(getCoachList(data));
    }, [dispatch])

    const headCells = [
        { id: 'userName', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'reservationName', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'reservationLevel', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'carTime', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'courseTime', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'isBDE', numeric: false, disablePadding: false, label: 'DDT' },
        { id: 'courseExamTime', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'reservationArea', numeric: false, disablePadding: false, label: '????????????' },
        { id: 'haveCoach', numeric: false, disablePadding: false, label: '???????????????' },
        { id: 'coachName', numeric: false, disablePadding: false, label: '????????????' },
    ];

    const studentList = useSelector(state => state.studentData.data);
    const coachList = useSelector(state => state.coachData.list);

    if (studentList == null || coachList == null) {
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
                                <DisplayTable rows={studentList} headCells={headCells} deleteFunction={deleteFunction} editFunction={editFunction} />
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
                                    <div class="col-md-12  margin-10 text-right">
                                        <Button type="button" onClick={() => handleOnSubmit()} variant="contained" color="primary">
                                            ????????????
                                        </Button>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="jd-cells">
                                            <div class="jd-heading">????????????</div>
                                            <div class="row jd-row">
                                                <div class="col-xs-12">
                                                    <div class="jd-account">
                                                        ????????????(STUDENT NO.): <span class="id">{editdate.userNumber}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(NAME)</div>
                                                        <div class="form-val">{editdate.licenseName}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(SEX)</div>
                                                        <div class="form-val">{editdate.licenseGender == 0 ? "???" : "???"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">??????????????????(REST)</div>
                                                        <div class="form-val">{editdate.licenseEye == 0 ? "???" : "???"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(DOB)</div>
                                                        <div class="form-val">{editdate.licenseBirthday}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-4">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(PHONE NO.)</div>
                                                        <div class="form-val">{editdate.licensePhone}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(EMAIL)</div>
                                                        <div class="form-val">{editdate.licenseEmail}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-5">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(ADDRESS)</div>
                                                        <div class="form-val">{editdate.licenseAddress}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-4">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(NO.)</div>
                                                        <div class="form-val">{editdate.licenseNumber}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(EXP)</div>
                                                        <div class="form-val">{editdate.licenseExpireDate}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-5">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(CLASS)</div>
                                                        <div class="form-val">{editdate.reservationLevel}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-4">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{editdate.carTime}Hr</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{editdate.courseTime}Hr</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-5">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{editdate.courseExamTime}Hr</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="row jd-row">
                                            <div class="jd-heading">{editdate.reservationArea}????????????</div>
                                            <div class="col-xs-12">
                                                <ul class="stu-list">
                                                    {
                                                        coachList.map((course, index) =>
                                                            course.serverLocation == editdate.reservationArea &&
                                                            <li>
                                                                <a onClick={() => selectCoach(course)} class="stu-cell">
                                                                    <div class="stu-avatar">
                                                                        <img src={course.userImageshowurl} />
                                                                    </div>
                                                                    <div class="col">
                                                                        <div class="stu-name">{course.licenseName}<i class="suc-icon"></i></div>
                                                                        <div class="stu-ads">?????????{course.serverLocation} ?????????{course.backupServerLocation}</div>
                                                                    </div>
                                                                </a>
                                                            </li>)
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="jd-cells">
                                            <div class="jd-heading">????????????</div>
                                            <div class="row jd-row">
                                                <div class="col-xs-12">
                                                    <div class="jd-account">
                                                        ????????????(COACH NO.): <span class="id">{coachdate.userNumber}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(NAME)</div>
                                                        <div class="form-val">{coachdate.licenseName}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(SEX)</div>
                                                        <div class="form-val">{coachdate.licenseGender == 0 ? "???" : "???"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(NO.)</div>
                                                        <div class="form-val">{coachdate.licenseNumber}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(EXP)</div>
                                                        <div class="form-val">{coachdate.licenseExpireDate}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-4">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(PHONE NO.)</div>
                                                        <div class="form-val">{coachdate.licensePhone}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-4">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(EMAIL)</div>
                                                        <div class="form-val">{coachdate.licenseEmail}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-4">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????(ADDRESS)</div>
                                                        <div class="form-val">{coachdate.licenseAddress}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">??????????????????</div>
                                                        <div class="form-val">{coachdate.licenseNumber}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{coachdate.licenseExpireDate}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">?????????????????????</div>
                                                        <div class="form-val">{coachdate.cityLicenseNumber}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????????????????</div>
                                                        <div class="form-val">{coachdate.cityLicenseCity}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{coachdate.carBrand}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{coachdate.carPlate}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{coachdate.carModel}</div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-md-3">
                                                    <div class="form-row">
                                                        <div class="form-label">????????????</div>
                                                        <div class="form-val">{coachdate.carDriveDistense}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 padding-left-25">
                                        <div class="row jd-row">
                                            <div class="jd-heading">{editdate.reservationArea}??????????????????</div>
                                            <div class="col-xs-12">
                                                <ul class="stu-list">
                                                    {
                                                        coachList.map((course, index) =>
                                                        <li>
                                                            <a onClick={() => selectCoach(course)} class="stu-cell">
                                                                <div class="stu-avatar">
                                                                    <img src={course.userImageshowurl} />
                                                                </div>
                                                                <div class="col">
                                                                    <div class="stu-name">{course.licenseName}<i class="suc-icon"></i></div>
                                                                    <div class="stu-ads">?????????{course.serverLocation} ?????????{course.backupServerLocation}</div>
                                                                </div>
                                                            </a>
                                                        </li>)
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12  margin-10 text-right">
                                        <Button type="button" onClick={() => handleOnSubmit()} variant="contained" color="primary">
                                            ????????????
                                        </Button>
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
