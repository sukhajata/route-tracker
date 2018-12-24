import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { withStyles } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import AddJourney from './components/AddJourney';
import ListJourneys from './components/ListJourneys';
import ListStops from './components/ListStops';
import ListPassengers from './components/ListPassengers';
import * as subscriptions from './graphql/subscriptions';
import ListSchedule from './components/ListSchedule';
import AddSchedule from './components/AddSchedule';
import Trips from './components/Trips';

Amplify.configure(aws_exports);
//Hosting endpoint: http://routetracker-20181211084302-hostingbucket.s3-website-us-east-1.amazonaws.com
//15bln0n6tj8etn8q527fdn7gpo
const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
});


class App extends Component {
  state = {
    multiline: 'Controlled',
    journeys: [],
    currentJourney: {},
    passengers: [],
    schedule: [],
    trips: [],
    error: '',
    loading: false,
  };

  addJourney = newJourney => {
    this.setState({ loading: true });
    API.graphql(graphqlOperation(mutations.createJourney, {input: newJourney}));
  }

  async getJourneys() {
    this.setState({ loading: true });
    const query = await API.graphql(graphqlOperation(queries.listJourneys));
    this.setState({
        journeys: query.data.listJourneys.items,
        loading: false,
    });
  }

  getJourney = async journeyId => {
    this.setState({ loading: true });
    if (this.state.journeys.length === 0) {
      await this.getJourneys();
    }
    const journey = this.state.journeys.filter( journey => journey.id === journeyId)[0];
    
    this.setState({ 
      loading: false,
      currentJourney: journey
    });
  }

  addSchedule = async data => {
    this.setState({ loading: true });
    
    const result = await API.graphql(graphqlOperation(mutations.createSchedule, { input: data }));
    console.log(result);
  }

  deleteJourney = data => {
    this.setState({ loading: true });
    API.graphql(graphqlOperation(mutations.deleteJourney, {input: data}));
  }

  getTrip = async (scheduleId, date) => {
    this.setState({ loading: true });
    const filter = {
      date: date,
      tripScheduleId: scheduleId
    };
    const query = await API.graphql(graphqlOperation(queries.listTrips, { filter: filter }));
    console.log(query);

    const data = {
      date: date,
      tripScheduleId: scheduleId
    };

    return null;
    //const result = await API.graphql(graphqlOperation(mutations.createTrip, { input: data }));
  }

  getPassengers = async tripId => {
    this.setState({ loading: true });
    const query = await API.graphql(graphqlOperation(queries.listPassengers));
    this.setState({
        journeys: query.data.listPassengers.items,
        loading: false,
    });
  }

  getSchedule = async (journeyId, weekday) => {
    this.setState({ loading: true });
    if (this.state.journeys.length === 0) {
      await this.getJourneys();
    }
    const journey = this.state.journeys.filter( journey => journey.id === journeyId)[0];
    const schedule = journey.schedule.items.filter( item => item.day === weekday);
    return schedule;
  }

  async componentDidMount() {
    await this.getJourneys();

    API.graphql(graphqlOperation(subscriptions.onCreateJourney)).subscribe({
          next: (response) => {
              let journeys = this.state.journeys;
              journeys.push(response.value.data.onCreateJourney);
              this.setState ({ journeys, loading: false });
          }
      });

    API.graphql(graphqlOperation(subscriptions.onDeleteJourney)).subscribe({
      next: (response) => {
          const deleted = response.value.data.onDeleteJourney;
          const journeys = this.state.journeys.filter( item => item.id !== deleted.id);
          this.setState ({ journeys, loading: false });
      }
    });

    API.graphql(graphqlOperation(subscriptions.onCreateSchedule)).subscribe({
      next: (response) => {
        const newSchedule = response.value.data.onCreateSchedule;
        const journeys = this.state.journeys.map(journey => {
          if (journey.id === newSchedule.journey.id) {
            journey.schedule.items.push(newSchedule);
          }
          return journey;
        });
        this.setState({ 
          journeys: journeys,
          loading: false,
        });
      }
    });

  }

  render() {
    const { classes } = this.props;
    const { journeys, currentJourney, passengers, schedule, loading } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <div className={classes.root}>
          <Switch>
            <Route 
              exact path="/" 
              render={props => <ListJourneys {...props} journeys={journeys} loading={loading} getSchedule={this.getSchedule} deleteJourney={this.deleteJourney}/> }  
            />
            <Route
              path="/addjourney"
              render={props => <AddJourney {...props} journeys={journeys} loading={loading} addJourney={this.addJourney} />}
            />
            <Route
              path="/liststops/:id"
              render={props => <ListStops {...props}/>}
            />
            <Route
              path="/listpassengers/:id"
              render={props => <ListPassengers {...props} passengers={passengers}/>}
            />
            <Route
              path="/listschedule/:id"
              render={props => <ListSchedule {...props} journey={currentJourney} getJourney={this.getJourney} />}
            />
            <Route
              path="/addschedule/:id"
              render={props => <AddSchedule {...props} addSchedule={this.addSchedule} />}
            />
            <Route
              path="/trips/:id"
              render={props => <Trips {...props} journey={currentJourney} getJourney={this.getJourney} getSchedule={this.getSchedule} getTrip={this.getTrip}/>}
            />
            <Route
              path="/listpassengers/:id"
              render={props => <ListPassengers {...props} journey={currentJourney} getJourney={this.getJourney} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
      </MuiPickersUtilsProvider>
    );
  }
}

const authApp = withAuthenticator(App, false);
export default withStyles(styles)(authApp);
