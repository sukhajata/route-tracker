import React, { Component } from 'react';

import { format } from 'date-fns'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
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
    button: {
        margin: theme.spacing.unit,
    },
});

class Passengers extends Component {
    state = {
        name: '',
        seat: '',
        passengerContent: 'list',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickAddPassenger = event => {
        
        this.setState({ 
            passengerContent: 'add', 
        });
    };

    render() {
        const { trip, classes, handleSubmitPassenger, handleClickHidePassengers, date, time } = this.props;
        const { name, seat, passengerContent } = this.state;

        const Header = props => { 
            return (
                <div>
                    <ArrowBackIcon onClick={handleClickHidePassengers}/>
                    <h4>{format(date, 'dd-MM-yyyy')} {time.toString()}</h4> 
                </div>
            );
        }

        if (passengerContent === 'list') {
            return (
                <div>
                    <Header date time />
                    <Table className={classes.demo}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader}>Passengers</TableCell>
                                <TableCell><Button onClick={this.handleClickAddPassenger} variant="contained" color="primary">+</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Seat</TableCell>
                                <TableCell>Destination</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trip && trip.passengers &&
                                trip.passengers.items.map((passenger) => 
                                    <TableRow key={passenger.id} >
                                        <TableCell>{passenger.name}</TableCell>
                                        <TableCell>{passenger.seat}</TableCell>
                                        <TableCell>{passenger.destination}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            );
        } else if (passengerContent === 'add') {
            return (
                <div>
                    <Header date time />
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid container spacing={16} direction="column">
                            <Grid key="code" item>
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid key="from" item>
                                <TextField
                                    id="seat"
                                    label="Seat"
                                    className={classes.textField}
                                    value={seat}
                                    onChange={this.handleChange('seat')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid key="submit" item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="classes.button"
                                    onClick={() => handleSubmitPassenger(name, seat)}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            );
        }
    }
}

export default withStyles(styles)(Passengers);