import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { DatePicker } from 'material-ui-pickers';
import { format } from 'date-fns';

import { withStyles } from '@material-ui/core/styles';

import SvgIcon from '@material-ui/core/SvgIcon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Passengers from './Passengers';
import AddSchedule from './AddSchedule';
import ListSchedule from './ListSchedule';
import ListStops from './ListStops';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

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


class Trips extends Component {
    state = {
        multiline: 'Controlled',
        date: new Date(),
        time: '',
        name: '',
        seat: '',
        schedule: [],
        tabValue: 'one',
        showDateTime: true,
        scheduleContent: 'list',
        showPassengers: false,
    };

    async componentDidMount() {
        await this.props.getJourney(this.props.match.params.id);
        this.selectDate(this.state.date);
    }

    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    selectDate = async date => {
        const weekday = format(date, 'EEEE');
        const schedule = await this.props.getSchedule(this.props.match.params.id, weekday);

        this.setState({ date, schedule, })
    };

    selectTime = async event => {
        const time = event.target.value;
        const schedule = this.state.schedule.filter(item =>  item.time === time)[0];
        await this.props.getTrip(schedule.id, this.state.date);

        this.setState({ 
            time: event.target.value, 
            showPassengers: true,
            showDateTime: false,
        });
    };

    handleClickHidePassengers = () => {
        this.setState({ 
            showDateTime: true,
            showPassengers: false,
        });
    };

    handleClickAddSchedule = () => {
        this.setState({
            scheduleContent: 'add',
        })
    };

    handleSubmitPassenger = (name, seat) => {
        this.props.addPassenger(this.props.trip.id, name, seat);
        
        this.setState({
            showPassengers: true
        });
        //this.props.history.push('/');
    };

    handleAddSchedule = (day, time) => {
        this.props.addSchedule(day, time, this.props.match.params.id);
        this.setState({
            scheduleContent: 'list',
        });
        //this.props.history.push('/listschedule/' + this.props.match.params.id);
    };

    render() {
        const { classes, journey, loading, trip, error, getStops, addStop, deleteStop  } = this.props;
        const { tabValue, schedule, date, time, showPassengers, showDateTime, scheduleContent } = this.state;

        if (loading) return (<h2>Loading...</h2>);

        if (error) return (<h5>{error}</h5>)

        const HomeIcon = props => {
            return (
                <SvgIcon {...props}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
            );
        }

        return (
            <div className={classes.root}>
                <div>
                    <Link to="/"><HomeIcon className={classes.icon} color="primary" /></Link>
                </div>
                <h3>{ journey.from && journey.from + ' to ' + journey.to}</h3>
                <AppBar position="static">
                    <Tabs value={tabValue} onChange={this.handleTabChange}>
                        <Tab value="one" label="Trips" />
                        <Tab value="two" label="Schedule" />
                        <Tab value="three" label="Stops" />
                    </Tabs>
                </AppBar>
                {tabValue === 'one' && 
                    <TabContainer>
                        {showDateTime && 
                            <div>
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
                                    onChange={this.selectTime}
                                    className={classes.inputField}
                                >
                                    {schedule.map( item => <MenuItem key={item.id} value={item.time}>{item.time}</MenuItem>)}
                                </Select>
                            </div>
                        }
                        {showPassengers &&  
                            <Passengers 
                                date={date} 
                                time={time} 
                                trip={trip} 
                                handleSubmitPassenger={this.handleSubmitPassenger}  
                                handleClickHidePassengers={this.handleClickHidePassengers}
                            />
                        }
                    </TabContainer>
                }
                
                {tabValue === 'two' && 
                    <TabContainer>
                        {scheduleContent === 'list' && 
                            <ListSchedule 
                                loading={loading} 
                                error={error}
                                journey={journey} 
                                handleClickAddSchedule={this.handleClickAddSchedule}
                            />
                        }
                        {scheduleContent === 'add' && 
                            <AddSchedule 
                                loading={loading} 
                                error={error}
                                handleAddSchedule={this.handleAddSchedule}
                            />
                        }
                    </TabContainer>
                }
               
                {tabValue === 'three' &&
                    <TabContainer>
                        <ListStops 
                            loading={loading}
                            error={error}
                            journey={journey}
                            getStops={getStops}
                            addStop={addStop}
                            deleteStop={deleteStop}
                        />
                    </TabContainer>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Trips);
