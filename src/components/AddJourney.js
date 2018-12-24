import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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


class AddJourney extends Component {
  state = {
    code: '',
    from: '',
    to: '',
    multiline: 'Controlled'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => async event => {
    const newJourney = {
      from: this.state.from,
      to: this.state.to
    };
    this.props.addJourney(newJourney);
    this.setState({
        from: '',
        to: '',
    });
    this.props.history.push('/');
  };

  render() {
    const { classes, loading } = this.props;

    if (loading) return (<h2>Loading...</h2>);

    return (
        <div>
            <h2>Add Route</h2>
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container spacing={16} direction="column">
                <Grid key="code" item>
                    <TextField
                    id="code"
                    label="Code"
                    className={classes.textField}
                    value={this.state.code}
                    onChange={this.handleChange('code')}
                    margin="normal"
                    />
                </Grid>
                <Grid key="from" item>
                    <TextField
                    id="from"
                    label="From"
                    className={classes.textField}
                    value={this.state.from}
                    onChange={this.handleChange('from')}
                    margin="normal"
                    />
                </Grid>
                <Grid key="to" item>
                    <TextField
                    id="to"
                    label="To"
                    className={classes.textField}
                    value={this.state.to}
                    onChange={this.handleChange('to')}
                    margin="normal"
                    />
                </Grid>
                <Grid key="submit" item>
                    <Button
                    variant="contained"
                    color="primary"
                    className="classes.button"
                    onClick={this.handleClick()}>
                    Submit
                    </Button>
                </Grid>
                </Grid>
            </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddJourney);
