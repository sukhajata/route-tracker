import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
          fontSize: '1.2em',
      }
});


class ListJourneys extends Component {
    state = {
        multiline: 'Controlled'
    };

    handleDelete = id => async event => { 
        const data = { id };
        this.props.deleteJourney(data);
    };

    render() {
        const { classes, journeys, loading } = this.props;

        const TableContent = journeys.map((journey) => 
            <TableRow key={journey.id} >
                <TableCell><Link to={'/trips/' + journey.id}><Button>{journey.from + " to " + journey.to}</Button></Link></TableCell>
                <TableCell><Button onClick={this.handleDelete(journey.id)}>delete</Button></TableCell>
            </TableRow>
        );

        if (loading) return (<h2>Loading...</h2>);

        return (
            <div>
                <Table className={classes.demo}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader}>Routes</TableCell>
                            <TableCell><Link to="/addjourney"><Button variant="contained" color="primary">+</Button></Link></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableContent}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(ListJourneys);
