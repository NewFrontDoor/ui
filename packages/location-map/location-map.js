import React from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import Text from "mineral-ui/text";
import Link from "mineral-ui/link";

const LocationMapComponent = compose(
    withProps(props => ({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    })),
    withScriptjs,
    withGoogleMap
)((props) => 
    <GoogleMap defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
);



export default ({ googleMapsApiKey, churchName, address1, address2 }) => (
    <div>
        <Text element="h2">Where to Find Us</Text>
        <div className="content">
            <div className="map">
                <LocationMapComponent isMarkerShown apiKey={googleMapsApiKey} />
            </div>
            <div className="address">
                <Text element="h3">
                    <Link href={`https://www.google.com.au/search?q=${churchName}`} target="_blank">
                        {churchName}
                    </Link>
                </Text>
                <Text appearance="h4">{address1}</Text>
                <Text appearance="h4">{address2}</Text>
            </div>
        </div>
    </div>);
