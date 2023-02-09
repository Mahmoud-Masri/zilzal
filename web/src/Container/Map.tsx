import { MapContainer, Marker, Popup } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

const position = [51.505, -0.09] as LatLngTuple;

export default function Map() {
    return (
        <div style={{ width: 300, height: 300 }}>
            <MapContainer
                center={{
                    lat: 51.505,
                    lng: -0.09,
                }}
                zoom={13}
                scrollWheelZoom={false}
            >
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
