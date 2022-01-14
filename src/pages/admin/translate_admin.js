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
import Radio from '@material-ui/core/Radio';
import sizing from '@material-ui/system';

import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import DisplayTable from './displayTable';
import UploadImage from './uploadImage';

import { getTranslate,finishTranslate } from '../../actions/translate';

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
        {}
    );
    // console.log("2",editdate);

    // let { current: formDatas } = React.useRef({});
    // let formDatas = { questionId:" ",questionTitle:" ",questionImage:" ",tmpquestionImage:" ",questionTip:" ",answer1:" ",answer2:" ",answer3:" ",answer4:" ",rightAnswer:"1"};

    // 使用 useCallback 来声明函数, 减少组件重绘时重新声明函数的开销
    const handleOnChange = React.useCallback(event => {
        // 在input事件中, 我们将dom元素的值存储起来, 用于表单提交
        // if (event.target.name == "questionImage") {
        //     formDatas[event.target.name] = event.target.files[0];
        // } else {
        //     formDatas[event.target.name] = event.target.value;
        // }
        if (event.target.name == "questionImage") {
            setEditdate({ [event.target.name]: event.target.files[0] });
        } else {
            setEditdate({ [event.target.name]: event.target.value });
        }
        // console.log(editdate);
    }, [editdate]);

    const finishtranslate = (translateState) =>{
        //'0：未付款；1未完成；2已完成；2拒绝'
        let data = {isFiniesh:1,translateId:editdate.translateId,translateState:translateState};
        dispatch(finishTranslate(data))
    }

    let { current: deleteDatas } = React.useRef({});

    const deleteFunction = (deletelist) => {
        deleteDatas["isDelete"] = 1;
        deleteDatas["questionId"] = deletelist;
        console.log(deleteDatas);
        // dispatch(deleteQuestion(deleteDatas));
    }

    const editFunction = (editlist) => {
        editdate = {};
        console.log(editlist);
        translateList.map((row, index) => {
            if (row["translateId"] === editlist[0]) {
                // row["tmpquestionImage"] = row["questionImage"];
                // console.log(row);
                setEditdate(row);
            }
        })
        // console.log(formDatas);
        setAnchorEl(anchorEl ? null : editlist);
    }
    const message = useSelector(state => state.translateData.finishmessage);
    // //componentDidUpdate --- Only re-run the effect if message changes
    useEffect(() => {
        if(message == "success"){
            handleClose();
            let data = { "isGet": 1 };
            dispatch(getTranslate(data));
        }
    }, [message])

    useEffect(() => {
        let data = { "isGet": 1 };
        dispatch(getTranslate(data))
    }, [dispatch])

    const headCells = [
        { id: 'translateImageList', numeric: false, disablePadding: false, label: '翻译图片' },
        { id: 'translateUserName', numeric: false, disablePadding: false, label: '名字' },
        { id: 'translateUserPhone', numeric: false, disablePadding: false, label: '电话' },
        { id: 'translateUserEmail', numeric: false, disablePadding: false, label: '邮箱' },
        { id: 'trasnslateUserAddress', numeric: false, disablePadding: false, label: '地址' },
        { id: 'translateType', numeric: false, disablePadding: false, label: '翻译件类型' },
        { id: 'translatePurpose', numeric: false, disablePadding: false, label: '翻译件用途' },
        { id: 'translateState', numeric: false, disablePadding: false, label: '是否完成' },
    ];

    const translateList = useSelector(state => state.translateData.data);

    if (translateList == undefined) {
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
                            <Button aria-describedby={id} variant="contained" color="primary"  href="/#/web/translatecenter" target="_blank" rel="noopener noreferrer">
                                {/* <a href="/#/web/translatecenter" target="_blank" rel="noopener noreferrer">添加新翻译</a> */}添加新翻译
                            </Button>
                            <Paper className={classes.paper}>
                                <DisplayTable rows={translateList} headCells={headCells} deleteFunction={deleteFunction} editFunction={editFunction} />
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
                            <form noValidate autoComplete="off">
                                {
                                    editdate.translateImageList != null &&
                                    editdate.translateImageList.map((course, index) =>
                                        <div class="col-md-6 padding-left-25">
                                            <div className="margin-top-10">
                                                <img src={course} />
                                            </div>
                                        </div>
                                    )
                                }

                                <div class="col-md-3 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译类型： {editdate.translateName}</div>
                                    </div>
                                </div>
                                <div class="col-md-3 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译目的： {editdate.translatePurpose}</div>
                                    </div>
                                </div>
                                <div class="col-md-3 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译文件： {editdate.translateType}</div>
                                    </div>
                                </div>
                                <div class="col-md-3 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">邮寄方式： {editdate.translateHurry}</div>
                                    </div>
                                </div>
                                <div class="col-md-6 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译人名字： {editdate.translateUserName}</div>
                                    </div>
                                </div>
                                <div class="col-md-6 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译人电话： {editdate.translateUserPhone}</div>
                                    </div>
                                </div>
                                <div class="col-md-6 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译人Email： {editdate.translateUserEmail}</div>
                                    </div>
                                </div>
                                <div class="col-md-6 padding-left-25">
                                    <div className="margin-top-10">
                                        <div class="form-label">翻译人地址： {editdate.trasnslateUserAddress}</div>
                                    </div>
                                </div>


                                <div class="col-md-2  margin-10">
                                    <div class="d-inline">
                                        {/* 0：未付款；1未完成；2已完成；3拒绝 */}
                                        <Button onClick={()=>finishtranslate("2")} type="button" variant="contained" color="primary">
                                            完成
                                        </Button>
                                    </div>
                                    <div class="d-inline ml-1">
                                        <Button onClick={()=>finishtranslate("3")} type="button" variant="contained" color="secondary">
                                            拒绝
                                        </Button>
                                    </div>
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
