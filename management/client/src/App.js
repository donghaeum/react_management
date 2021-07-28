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

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    // margin: theme.spacing(2)
  }
})



class App extends Component {

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

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
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
              this.state.webtoons ? this.state.webtoons.map(w => {
                return (
                  <Webtoon 
                    id={w.id}
                    image={w.image}
                    title={w.title}
                    pdate={w.pdate}
                    ldate={w.ldate}
                    genre={w.genre}
                    platform={w.platform}
                  />
                )
              }) : 
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      
    )
  }
}

export default withStyles(styles) (App);
