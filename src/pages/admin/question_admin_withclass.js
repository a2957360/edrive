import React from 'react';
import { connect } from 'react-redux';

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
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

import { addQuestion } from '../../actions/backend';

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

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }
  addQuestion = (formdata) => {
    this.props.addQuestion(formdata);
  }

  componentDidMount = () => {
    //请求api
    // this.props.getBarrageData();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.message !== this.props.message && this.props.message === 'success') {
      console.log('表格提交成功了');
    }
  }

  render() {
    return (
      <Question addQuestion={data => this.addQuestion(data)}/>
    );
  }
}

// function Question() {
const Question = (props) => {

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
  };

  const popopen = Boolean(anchorEl);
  const id = popopen ? 'simple-popper' : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { current: formDatas } = React.useRef({});

  // 使用 useCallback 来声明函数, 减少组件重绘时重新声明函数的开销
  const handleOnChange = React.useCallback(event => {
    // 在input事件中, 我们将dom元素的值存储起来, 用于表单提交
    formDatas[event.target.name] = event.target.value;
  }, []);

  const handleOnSubmit = React.useCallback(event => {
    // 提交表单
    console.log('formDatas: ', formDatas);
    let fileData = new FormData();
    for (var key in formDatas) {
      fileData.append(key, formDatas[key]);
      console.log(key, formDatas[key]);
    }
    // this.setState(
    //   {
    //     selectedFile: null
    //   },
    //   () => {
    props.addQuestion(fileData);
    //   }
    // );
    event.preventDefault();
  }, []);

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
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders rows={123} headerCell={456} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
        <button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          Open Popover
      </button>
        <Popover
          id={id}
          open={popopen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 500, left: 800 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Paper>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleOnChange} onSubmit={handleOnSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <TextField id="outlined-basic" name="questionTitle" label="问题名称" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" name="answer1" label="答案1" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" name="answer2" label="答案2" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" name="answer3" label="答案3" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" name="answer4" label="答案4" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" name="questionTip" label="Tip" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Primary
                  </Button>
                </Grid>

              </Grid>
            </form>
          </Paper>
        </Popover>
      </main>
    </div>
  );
}

const mapStateToProps = ({ backendReducer }) => {
  const { message } = backendReducer;
  return { message };
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (data) => {
      dispatch(addQuestion(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
