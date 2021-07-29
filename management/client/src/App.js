import React, {Component} from 'react';
import './App.css';
import Webtoon from './components/Webtoon';
import { Paper } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {DataGrid} from '@material-ui/data-grid';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      webtoons: '',
      completed: 0,
      searchKeyword: ''
    }
  }
  

  state = {
    webtoons: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res=>this.setState({webtoons: res}))
      .catch(err=>console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/webtoons');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.pdate] = e.target.value;
    this.setState(nextState);
  }
  
  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.title.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Webtoon id={c.id} image={c.image} title={c.title} pdate={c.pdate} ldate={c.ldate} genre={c.genre} platform={c.platform}/>
      });
    }
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Webtoon Search
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                year="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
                // inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>연재 시작일</TableCell>
                <TableCell>최신화 연재일</TableCell>
                <TableCell>장르</TableCell>
                <TableCell>플랫폼</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.webtoons ? 
                  filteredComponents(this.state.webtoons)
                : 
                <TableRow>
                  <TableCell colSpan="7" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        {/* <DataGrid pageSize={10}/> */}
      </div>
      
    )
  }
}

export default withStyles(styles) (App);
