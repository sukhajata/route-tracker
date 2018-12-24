import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { DatePicker } from 'material-ui-pickers';

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


class ListPassengers extends Component {
    state = {
        multiline: 'Controlled',
        date: new Date(),
    };

    async componentDidMount() {
        console.log(this.props);
        await this.props.getJourney(this.props.match.params.id);
    }

    handleDelete = id => async event => { 
        const data = { id };
        this.props.deleteJourney(data);
    };

    handleClick = id => event => {

    };

    onChange = date => {
        this.setState({ date })
    };

    render() {
        const { classes, journey, loading } = this.props;
        const { passengers } = this.state;

        if (loading) return (<h2>Loading...</h2>);

        const Passengers = passengers && passengers.map((passenger) => 
            <TableRow key={passenger.id} >
                <TableCell><input value={passenger.name}/></TableCell>
                <TableCell><input value={passenger.destination}/></TableCell>
            </TableRow>
        );

        const Times = journey && journey.schedule.items.map((item) => 
            <TableRow key={item.id} >
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
            </TableRow>
        );
        

        return (
            <div>
                <DatePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <Table className={classes.demo}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader}>
                                { journey && journey.from + ' to ' + journey.to}
                            </TableCell>
                            <TableCell><Link to={'/addschedule/' + this.props.match.params.id}><Button variant="contained" color="primary">+</Button></Link></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { Times }
                    </TableBody>
                </Table>
                <Table className={classes.demo}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader}>Passengers</TableCell>
                            <TableCell><Button variant="contained" color="primary">+</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Passengers}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(ListPassengers);
