import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
    },
    inputField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },

    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});


class AddSchedule extends Component {
  state = {
    day: '',
    time: '',
    journeyId: '',
    multiline: 'Controlled'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onTimeChange = (options) => {
    this.setState({ time: options.hour + ":" + options.minute });
  }
 
  onFocusChange = (focusStatue) => {
    
  }

 

  render() {
    const { classes, loading, handleAddSchedule } = this.props;
    const { day, time } = this.state;
    const days = ['Every day', 'Mon-Fri', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (loading) return (<h2>Loading...</h2>);

    return (
        <div>
            <h2>Add Schedule</h2>
           
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container spacing={16} direction="column">
                <Grid key="code" item>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="day-simple">Day</InputLabel>
                        <Select
                            id="day"
                            label="Day"
                            value={day}
                            inputProps={{
                                name: 'day',
                                id: 'day-simple',
                            }}
                            onChange={this.handleChange('day')}
                            className={classes.inputField}
                        >
                            {days.map( day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid key="from" item>
                    <div className={classes.inputField}>
                        <TimePicker
                            time={time}
                            onFocusChange={this.onFocusChange}
                            onTimeChange={this.onTimeChange}
                        />
                    </div>
                </Grid>
                <Grid key="submit" item>
                    <Button
                    variant="contained"
                    color="primary"
                    className="classes.button"
                    onClick={() => handleAddSchedule(day, time)}>
                    Submit
                    </Button>
                </Grid>
                </Grid>
            </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddSchedule);
