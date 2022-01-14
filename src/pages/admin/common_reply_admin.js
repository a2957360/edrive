import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

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
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import DisplayTable from './displayTable';
import UploadImage from './uploadImage';

import { getCommonReply, addCommonReply, deleteCommonReply, editCommonReplyn } from '../../actions/comme_reply';

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
        setEditdate({ commonReplyId: "", commonReplyTitle: "", commonReplyContent: "", commonReplytype:"" });
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
        { commonReplyId: "", commonReplyTitle: "", commonReplyContent: "", commonReplytype:""  }
    );


    // 使用 useCallback 来声明函数, 减少组件重绘时重新声明函数的开销
    const handleOnChange = React.useCallback(event => {
        setEditdate({ [event.target.name]: event.target.value });
    }, [editdate]);

    const handleOnSubmit = React.useCallback(event => {
        // 提交表单
        let fileData = new FormData();
        for (var key in editdate) {
            fileData.append(key, editdate[key]);
            console.log(key, editdate[key]);
        }
        console.log(editdate);
        dispatch(addCommonReply(fileData))
        event.preventDefault();
    }, [dispatch, editdate]);

    let { current: deleteDatas } = React.useRef({});

    const deleteFunction = (deletelist) => {
        deleteDatas["isDelete"] = 1;
        deleteDatas["commonReplyId"] = deletelist;
        console.log(deleteDatas);
        dispatch(deleteCommonReply(deleteDatas));
    }


    //   let [editdate, resetEditdate] = React.useReducer(
    //     (state, newState) => ({state, ...newState}),
    //     { questionId:"",questionTitle:"",questionImage:"",tmpquestionImage:"",questionTip:"",answer1:"",answer2:"",answer3:"",answer4:"",rightAnswer:"1"}
    //   );
    const editFunction = (editlist) => {
        editdate = {};
        console.log(editlist);
        commonReplyList.map((row, index) => {
            if (row["commonReplyId"] === editlist[0]) {
                setEditdate(row);
            }
        })
        // console.log(formDatas);
        setAnchorEl(anchorEl ? null : editlist);
    }
    const message = useSelector(state => state.commonReplyData.message);
    // //componentDidUpdate --- Only re-run the effect if message changes
    useEffect(() => {
        handleClose();
        dispatch(getCommonReply());
        console.log(message);
    }, [message])

    useEffect(() => {
        dispatch(getCommonReply())
    }, [dispatch])

    const headCells = [
        { id: 'commonReplyTitle', numeric: false, disablePadding: false, label: '常见问题标题' },
        { id: 'commonReplyContenturl', numeric: false, disablePadding: false, label: '常见问题链接' },
        { id: 'commonReplytypeName', numeric: false, disablePadding: false, label: '常见问题分类' }
    ];

    const commonReplyList = useSelector(state => state.commonReplyData.list);

    if (commonReplyList == undefined) {
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
                                <DisplayTable rows={commonReplyList} headCells={headCells} deleteFunction={deleteFunction} editFunction={editFunction} />
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
                                        <input type="hidden" name="commonReplyId" value={editdate.commonReplyId} />
                                        <TextField name="commonReplyTitle" label="常见问题标题" fullWidth value={editdate.commonReplyTitle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }} />
                                    </div>
                                    <div class="margin-top-10">
                                        <TextField multiline rows={20} id="outlined-basic" name="commonReplyContent" fullWidth label="链接" variant="outlined" value={editdate.commonReplyContent} />
                                    </div>
                                    <div class="margin-top-10">
                                        <InputLabel htmlFor="age-native-helper">分类</InputLabel>
                                            <select class="admin_select"  name="commonReplytype">
                                                <option selected={editdate.commonReplytype == "0"} value="0">路考路线</option>
                                                <option selected={editdate.commonReplytype == "1"} value="1">G1重点</option>
                                                <option selected={editdate.commonReplytype == "2"} value="2">常见问题</option>
                                                <option selected={editdate.commonReplytype == "3"} value="3">驾考收费 区域一</option>
                                                <option selected={editdate.commonReplytype == "4"} value="4">驾考收费 区域二</option>
                                                <option selected={editdate.commonReplytype == "5"} value="5">驾考收费 区域三</option>
                                                <option selected={editdate.commonReplytype == "6"} value="6">教练端文档</option>
                                                <option selected={editdate.commonReplytype == "7"} value="7">学生端文档</option>
                                                <option selected={editdate.commonReplytype == "8"} value="8">学生端文档 笔试题库</option>
                                                <option selected={editdate.commonReplytype == "9"} value="9">学生端文档 驾考课程</option>
                                                <option selected={editdate.commonReplytype == "10"} value="10">学生端文档 驾照翻译</option>
                                                <option selected={editdate.commonReplytype == "11"} value="11">学生端文档 全科网课</option>
                                                <option selected={editdate.commonReplytype == "12"} value="12">学生端文档 我的EDRIVING</option>
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
