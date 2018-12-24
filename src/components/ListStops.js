import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MapComponent from './MapComponent';

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
      }
});

class ListStops extends Component {
    state = {
        multiline: 'Controlled'
    };

    handleDelete = id => async event => { 
        const data = { id };
        this.props.deleteJourney(data);
    };

    render() {
        const { classes, stops, loading } = this.props;

        const TableContent = stops.map((stop) => 
            <TableRow key={stop.id} >
                <TableCell>{stop.name}</TableCell>
                <TableCell>{stop.latitude}</TableCell>
                <TableCell>{stop.longitude}</TableCell>
                <TableCell>{stop.address}</TableCell>
                <TableCell onClick={this.handleDelete(stop.id)}>delete</TableCell>
            </TableRow>
        );

        if (loading) return (<h2>Loading...</h2>);

        return (
            <div>
                <Table className={classes.demo}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableContent}
                    </TableBody>
                </Table>
                <MapComponent
                  isMarkerShown={false}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyte4YYRWyZ1acAv3NFV7bRw9wK_70z5Q&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
  }
}

export default withStyles(styles)(ListStops);