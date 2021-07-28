import React from 'react';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';

class Webtoon extends React.Component {
    render() {
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.title}</TableCell>
                <TableCell>{this.props.pdate}</TableCell>
                <TableCell>{this.props.ldate}</TableCell>
                <TableCell>{this.props.genre}</TableCell>
                <TableCell>{this.props.platform}</TableCell>
            </TableRow>
        )
    }
}


export default Webtoon;