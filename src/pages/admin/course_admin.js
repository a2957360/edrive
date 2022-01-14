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

import { getCourse, addCourse, deleteCourse } from '../../actions/course';

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
        setEditdate({ courseId: "",courseName: "", courseTarget: "新手驾驶员", courseExamLevel: "G", carTime: "", courseTime: "", homeTime: "", isBDE: "0", courseExamTime: "", coursePrice: "", courseArea: "区域一" });
        // console.log(formDatas);
        console.log(editdate);
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
        { courseName: "", courseTarget: "新手驾驶员", courseExamLevel: "G", carTime: "", courseTime: "", homeTime: "", isBDE: "0", courseExamTime: "", coursePrice: "", courseArea: "区域一"  }
    );
    // 使用 useCallback 来声明函数, 减少组件重绘时重新声明函数的开销
    const handleOnChange = React.useCallback(event => {
        if (event.target.name == "questionImage") {
            setEditdate({ [event.target.name]: event.target.files[0] });
        } else {
            setEditdate({ [event.target.name]: event.target.value });
        }
        // console.log(editdate);
    }, [editdate]);

    const handleOnSubmit = React.useCallback(event => {
        // 提交表单
        let fileData = new FormData();

        for (var key in editdate) {
            fileData.append(key, editdate[key]);
            console.log(key, editdate[key]);
        }
        console.log(fileData);
        dispatch(addCourse(fileData))

        event.preventDefault();
    }, [dispatch, editdate]);

    let { current: deleteDatas } = React.useRef({});

    const deleteFunction = (deletelist) => {
        deleteDatas["isDelete"] = 1;
        deleteDatas["courseId"] = deletelist;
        dispatch(deleteCourse(deleteDatas));
    }


    //   let [editdate, resetEditdate] = React.useReducer(
    //     (state, newState) => ({state, ...newState}),
    //     { questionId:"",questionTitle:"",questionImage:"",tmpquestionImage:"",questionTip:"",answer1:"",answer2:"",answer3:"",answer4:"",rightAnswer:"1"}
    //   );
    const editFunction = (editlist) => {
        editdate = {};
        console.log(editlist);
        questionList.map((row, index) => {
            if (row["courseId"] === editlist[0]) {
                console.log(row);
                setEditdate(row);
            }
        })
        // console.log(formDatas);
        setAnchorEl(anchorEl ? null : editlist);
    }
    const message = useSelector(state => state.courseData.message);
    // //componentDidUpdate --- Only re-run the effect if message changes
    useEffect(() => {
        handleClose();
        dispatch(getCourse());
    }, [message])

    useEffect(() => {
        dispatch(getCourse())
    }, [dispatch])

    const headCells = [
        { id: 'courseName', numeric: false, disablePadding: false, label: '推荐配置' },
        { id: 'courseTarget', numeric: false, disablePadding: false, label: '适合对象' },
        { id: 'courseExamLevel', numeric: false, disablePadding: false, label: '路考等级' },
        { id: 'carTime', numeric: false, disablePadding: false, label: '练车时间' },
        { id: 'courseTime', numeric: false, disablePadding: false, label: '理论课程' },
        { id: 'homeTime', numeric: false, disablePadding: false, label: '家庭功课' },
        { id: 'isBDEName', numeric: false, disablePadding: false, label: 'DDT课程' },
        { id: 'courseExamTime', numeric: false, disablePadding: false, label: '小镇路考' },
        { id: 'coursePrice', numeric: false, disablePadding: false, label: '优惠价格' },
        { id: 'courseArea', numeric: false, disablePadding: false, label: '适用区域' },
    ];

    const questionList = useSelector(state => state.courseData.data);

    if (questionList == undefined) {
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
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                添加新问题
                            </Button>
                            <Paper className={classes.paper}>
                                <DisplayTable rows={questionList} headCells={headCells} deleteFunction={deleteFunction} editFunction={editFunction} />
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
                                <div class="col-md-12 padding-left-25">
                                    <div className="margin-top-10">
                                        <TextField
                                            label="推荐配置"
                                            fullWidth
                                            name="courseName"
                                            value={editdate.courseName}
                                        />
                                    </div>
                                    <div className="margin-top-10">
                                        <InputLabel htmlFor="age-native-helper">适合对象</InputLabel>
                                        <select class="admin_select" value={editdate.courseTarget} name="courseTarget">
                                            <option selected={editdate.courseTarget == "新手驾驶员"} value="新手驾驶员">新手驾驶员</option>
                                            <option selected={editdate.courseTarget == "熟练驾驶员"} value="熟练驾驶员">熟练驾驶员</option>
                                        </select>
                                    </div>
                                    <div className="margin-top-10">
                                        {/* <TextField
                                            label="路考等级"
                                            fullWidth
                                            name="courseExamLevel"
                                            value={editdate.courseExamLevel}
                                        /> */}
                                        <InputLabel htmlFor="age-native-helper">路考等级</InputLabel>

                                        <select class="admin_select" value={editdate.courseExamLevel} name="courseExamLevel">
                                            <option selected={editdate.courseExamLevel == "G2"} value="G2">G2</option>
                                            <option selected={editdate.courseExamLevel == "G"} value="G">G</option>
                                        </select>
                                    </div>
                                    <div className="margin-top-10">
                                        <TextField
                                            label="练车时间"
                                            fullWidth
                                            name="carTime"
                                            value={editdate.carTime}
                                        />
                                    </div>
                                    <div className="margin-top-10">
                                        <TextField
                                            label="理论课程"
                                            fullWidth
                                            name="courseTime"
                                            value={editdate.courseTime}
                                        />
                                    </div>
                                    <div className="margin-top-10">
                                        <TextField
                                            label="家庭功课"
                                            fullWidth
                                            name="homeTime"
                                            value={editdate.homeTime}
                                        />
                                    </div>
                                    <div className="margin-top-10">
                                        DDT课程<br />
                                        <label><input type="radio" name="isBDE" value="0" checked={editdate.isBDE === "0"} />没有</label>
                                        <label><input type="radio" name="isBDE" value="1" checked={editdate.isBDE === "1"} />有</label>
                                    </div>
                                    <div className="margin-top-10">
                                        <TextField
                                            label="小镇路考"
                                            fullWidth
                                            name="courseExamTime"
                                            value={editdate.courseExamTime}
                                        />
                                    </div>
                                    <div className="margin-top-10">
                                        <TextField
                                            label="优惠价格"
                                            fullWidth
                                            name="coursePrice"
                                            value={editdate.coursePrice}
                                        />
                                    </div>
                                    <div className="margin-top-10">
                                        <select class="admin_select" name="courseArea" class="form-control">
                                            <option value="区域一" selected={editdate.courseArea == "区域一"}>区域一</option>
                                            <option value="区域二" selected={editdate.courseArea == "区域二"}>区域二</option>
                                            <option value="区域三" selected={editdate.courseArea == "区域三"}>区域三</option>
                                        </select>
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
