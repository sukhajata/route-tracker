import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      },
      listItem: {
          backgroundColor: theme.palette.primary.light,
          margin: 8,
      },
      tableHeader: {
          fontSize: '1em',
      }
});


class ListSchedule extends Component {
    state = {
        multiline: 'Controlled'
    };

    render() {
        const { classes, journey, loading, handleClickAddSchedule } = this.props;

        const TableContent = journey.schedule && journey.schedule.items.map((item) => 
            <TableRow key={item.id} >
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
            </TableRow>
        );

        if (loading) return (<h2>Loading...</h2>);

        return (
            <div>
                <Table className={classes.demo}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader}>
                                &nbsp;
                            </TableCell>
                            <TableCell><Button variant="contained" color="primary" onClick={handleClickAddSchedule}>+</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { TableContent }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(ListSchedule);
