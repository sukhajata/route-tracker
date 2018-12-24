import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import _ from 'lodash';

class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bounds: null,
            center: { lat: 13.814, lng: 100.549 },
            zoom: 8,
            markers: [],
        };
        this.searchBoxRef = React.createRef();
        this.mapRef = React.createRef();
    }
   
    onPlacesChanged = () => {
        const places = this.searchBoxRef.current.getPlaces();
        if (places.length === 0) {
            console.log('No places found');
            return;
        }
        if (!places[0].geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        
        const point = places[0].geometry.location;
        this.setState({
            center: point,
            zoom: 13,
        })
    }

    onBoundsChanged = () => {
        this.setState({
            bounds: this.mapRef.current.getBounds(),
            center: this.mapRef.current.getCenter(),
        });
    }

    render() {
        const { isMarkerShown } = this.props;
        const { bounds, center, zoom } = this.state;

        return (
            <div>
                <SearchBox
                    ref={this.searchBoxRef}
                    bounds={bounds}
                    onPlacesChanged={this.onPlacesChanged}
                    controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                >
                    <input
                        type="text"
                        placeholder="Search.."
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `300px`,
                            height: `40px`,
                            marginTop: `10px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `16px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                        }}
                    />
                </SearchBox>
                <GoogleMap
                    ref={this.mapRef}
                    defaultZoom={zoom}
                    defaultCenter={center}
                    center={center}
                    zoom={zoom}
                >
                    {isMarkerShown && <Marker position={{ lat: 13.814, lng: 100.549 }} />}
                </GoogleMap>
            </div>
        )
    }
}

export default withScriptjs(withGoogleMap(MapComponent));