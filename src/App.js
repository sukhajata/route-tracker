import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { withStyles } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import { format } from 'date-fns'

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import ListJourneys from './components/ListJourneys';
import * as subscriptions from './graphql/subscriptions';
import Trips from './components/Trips';

Amplify.configure(aws_exports);
//Hosting endpoint: http://routetracker-20181211084302-hostingbucket.s3-website-us-east-1.amazonaws.com
//15bln0n6tj8etn8q527fdn7gpo
const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
  },
});


class App extends Component {
  state = {
    multiline: 'Controlled',
    journeys: [],
    currentJourney: {},
    passengers: [],
    schedule: [],
    //trips: [],
    currentTrip: {},
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

  addSchedule = async (day, time, journeyId) => {
    const newSchedule = {
      day: day,
      time: time + 'Z',
      scheduleJourneyId: journeyId,
    };
    this.setState({ loading: true });
    await API.graphql(graphqlOperation(mutations.createSchedule, { input: newSchedule }));
  }

  deleteJourney = data => {
    this.setState({ loading: true });
    API.graphql(graphqlOperation(mutations.deleteJourney, {input: data}));
  }

  getTrip = async (scheduleId, date) => {
    this.setState({ loading: true });
    const formattedDate = format(date, 'yyyy-MM-dd');
    const filter = {
      date: { eq: formattedDate },
      scheduleId: { eq: scheduleId },
    };
    
    try {
      const result = await API.graphql(graphqlOperation(queries.listTrips, { filter: filter }));
      let trip;
      if (result.data.listTrips.items.length === 0) {
        const input = {
          date: formattedDate,
          scheduleId: scheduleId,
        }
        const response = await API.graphql(graphqlOperation(mutations.createTrip, { input: input }));
        trip = response.data.createTrip;
      } else {
        trip = result.data.listTrips.items[0];
      }

      this.setState({
        loading: false,
        currentTrip: trip,
      });

    } catch (response) {
      console.log(response);
      const message = "Error getting trip: " + response.errors[0].message
      this.setState({ 
        error: message,
        loading: false,
        currentTrip: null,
      });
    }
    
  }

  addPassenger = (tripId, name, seat) => {
    this.setState({ loading: true });
    const input = {
      name: name, 
      seat: seat,
      passengerTripId: tripId,
    }
    API.graphql(graphqlOperation(mutations.createPassenger, { input: input }));
    
  };

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
    this.setState({ loading: false });
    return schedule;
  }

  getStops = journeyId => {
    const journey = this.state.journeys.filter( journey => journey.id === journeyId )[0];
    const stops = journey.stops.items;
    return stops;
  };


  addStop = async (name, latitude, longitude, journeyId) => {
    const input = {
      name,
      latitude,
      longitude,
      stopJourneyId: journeyId,
    };
    API.graphql(graphqlOperation(mutations.createStop, { input: input }));
  };

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

    API.graphql(graphqlOperation(subscriptions.onCreatePassenger)).subscribe({
      next: response => {
        const newPassenger = response.value.data.onCreatePassenger;
        if (this.state.currentTrip && this.state.currentTrip.id === newPassenger.trip.id) {
          let currentTrip = this.state.currentTrip;
          currentTrip.passengers.items.push(newPassenger);
          this.setState({ 
            loading: false,
            currentTrip: currentTrip,
          });
        } 
        
      }
    });

    API.graphql(graphqlOperation(subscriptions.onCreateStop)).subscribe({
      next:response => {
        const newStop = response.value.data.onCreateStop;
        if (this.state.currentJourney && this.state.currentJourney.id === newStop.journey.id) {
          let currentJourney = this.state.currentJourney;
          currentJourney.stops.items.push(newStop);
          this.setState({
            loading: false,
            currentJourney,
          });
        }
      }
    })

  }

  render() {
    const { classes } = this.props;
    const { journeys, currentJourney, passengers, loading, error } = this.state;

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
              path="/trips/:id"
              render={props => 
                <Trips {...props} 
                  loading={loading}
                  error={error}
                  journey={currentJourney} 
                  getJourney={this.getJourney} 
                  getSchedule={this.getSchedule} 
                  addSchedule={this.addSchedule}
                  getTrip={this.getTrip} 
                  getStops={this.getStops}
                  addStop={this.addStop}
                  trip={this.state.currentTrip} 
                  addPassenger={this.addPassenger}
                />}
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
