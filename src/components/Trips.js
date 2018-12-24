import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { DatePicker } from 'material-ui-pickers';
import { format } from 'date-fns'


import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
      },
      inputField: {
        marginBottom: 20,
        width: 200,
      },
});


class Trips extends Component {
    state = {
        multiline: 'Controlled',
        date: new Date(),
        time: '',
        trip: {},
        schedule: [],
        passengers: [],
        showPassengers: false,
    };

    async componentDidMount() {
        await this.props.getJourney(this.props.match.params.id);
        this.selectDate(this.state.date);
    }

   
    handleClickHome = event => {
        this.props.history.push('/');
    };

    selectDate = async date => {
        const weekday = format(date, 'EEEE');
        const schedule = await this.props.getSchedule(this.props.match.params.id, weekday);

        this.setState({ date, schedule, })
    };

    selectTime = async event => {
        const time = event.target.value;
        var schedule = this.state.schedule.filter(item =>  item.time === time)[0];
        const trip = await this.props.getTrip(schedule.id, this.state.date);
        this.setState({ 
            trip: trip,
            time: event.target.value, 
            showPassengers: true 
        });
    };

    render() {
        const { classes, journey, loading  } = this.props;
        const { schedule, date, time, passengers, showPassengers } = this.state;

        if (loading) return (<h2>Loading...</h2>);

        const HomeIcon = props => {
            return (
                <SvgIcon {...props}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
            );
        }

        const Passengers = passengers.map((passenger) => 
            <TableRow key={passenger.id} >
                <TableCell><input value={passenger.name}/></TableCell>
                <TableCell><input value={passenger.destination}/></TableCell>
            </TableRow>
        );

        return (
            <div>
                <div>
                    <HomeIcon className={classes.icon} color="primary" onClick={this.handleClickHome}/>
                </div>
                <h3>{ journey.from && journey.from + ' to ' + journey.to}</h3>
                <DatePicker
                    className={classes.inputField}
                    onChange={this.selectDate}
                    value={date}
                />
                <br/>
                <Select
                    id="time"
                    label="time"
                    value={time}
                    inputProps={{
                        name: 'time',
                        id: 'time-simple',
                    }}
                    onChange={this.selectTime}
                    className={classes.inputField}
                >
                    {schedule.map( item => <MenuItem key={item.id} value={item.time}>{item.time}</MenuItem>)}
                </Select>
                {showPassengers &&  
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
                }
               
            </div>
        );
    }
}

export default withStyles(styles)(Trips);
