import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import MapComponent from './MapComponent';
import { TextField, Button } from '@material-ui/core';
import Keys from '../config/keys';
  
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
    modal: {
        top: 50,
        left: 50,
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    input: {
        marginBottom: 20,
        width: 200,
    },
    leftButton: {
        marginRight: 20,
    },
  
});

class ListStops extends Component {
    state = {
        multiline: 'Controlled',
        stops: [],
        stopName: '',
        lat: '',
        lng: '',
        showModal: false,
    };

    handleDelete = id => async event => { 
        this.props.deleteStop(id);
    };

    componentDidMount() {
        const stops = this.props.getStops(this.props.journey.id);
        this.setState({ stops });
    }

    handleClickAddStop = (lat, lng) => {
        this.setState({ 
            lat,
            lng,
            showModal: true 
        });
    };

    handleChangeStopName = event => {
        this.setState({
            stopName: event.target.value,
        });
    };

    cancelModal = () => {
        this.setState({ showModal: false });
    };

    addStop = () => {
        this.setState({ showModal: false });    
        if (this.state.stopName !== '') {
            this.props.addStop(this.state.stopName, this.state.lat, this.state.lng, this.props.journey.id);
        }
        console.log(this.state.lat, this.state.lng, this.state.stopName);
    }

    render() {
        const { classes, loading, error, journey } = this.props;
        const { stopName } = this.state;
        const mapUrl = "https://maps.googleapis.com/maps/api/js?key=" + Keys.GOOGLE_MAPS_API_KEY + "&v=3.exp&libraries=geometry,drawing,places";

        if (loading) return (<h2>Loading...</h2>);

        if (error) return (<h5>{error}</h5>);

        const TableContent = journey && journey.stops && journey.stops.items.map((stop) => 
            <TableRow key={stop.id} >
                <TableCell>{stop.name}</TableCell>
                <TableCell>
                    <Button color="secondary" onClick={this.handleDelete(stop.id)}>
                        X
                    </Button>
                </TableCell>
            </TableRow>
        );

        return (
            <div>
                <Table className={classes.demo}>
                    <TableBody>
                        {TableContent}
                    </TableBody>
                </Table>
                <br/>
                <MapComponent
                  stops={journey.stops.items}
                  handleClickAddStop={this.handleClickAddStop}
                  googleMapURL={mapUrl}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
                 <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.showModal}
                    onClose={this.handleClose}
                    >
                    <div className={classes.modal} >
                        <Typography variant="h6" id="modal-title">
                            Add Stop
                        </Typography>
                        <TextField 
                            className={classes.input} 
                            label="Name of stop" 
                            id="stopName"
                            value={stopName}
                            onChange={this.handleChangeStopName}
                        ></TextField><br/>
                        <Button onClick={this.addStop} className={classes.leftButton} variant="contained" color="primary">OK</Button>
                        <Button onClick={this.cancelModal} variant="contained" color="secondary">Cancel</Button>
                    </div>
                </Modal>
            </div>
        );
  }
}

export default withStyles(styles)(ListStops);